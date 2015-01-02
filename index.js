var path = require("path");
var async = require("async");
var webpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var SingleEntryDependency = require("webpack/lib/dependencies/SingleEntryDependency");
var Pattern = require("karma/lib/config").Pattern;


function Plugin(
			/* config.port */karmaPort,
			/* config.hostname */hostname, /* config.webpackPort */port,
			/* config.webpack */webpackOptions, /* config.webpackServer */webpackServerOptions,
			/* config.basePath */basePath,
			/* config.files */files,
			/* config.frameworks */frameworks,
			emitter) {
	if(!port) port = karmaPort + 1;
	if(!hostname) hostname = "localhost";
	if(!webpackOptions) webpackOptions = {};

	if(!webpackServerOptions) webpackServerOptions = {};

	var applyOptions = Array.isArray(webpackOptions) ? webpackOptions : [webpackOptions];
	var includeIndex = applyOptions.length > 1;

	// Mark all explicitly listed files as not being included. Rather than utilizing the karma
	// server, we will utilize the webpack dev server to serve all content for the test. The
	// configed paths are left in place for change tracking and webpack entry point setup.
	var baseWithSlash = basePath.replace(/[^\/]$/, '$&/');
	var testFiles = files.filter(function(file) {
		if (file.pattern.indexOf(baseWithSlash) === 0) {
			file.included = false;
			file.served = false;
			return true;
		}
	});

	applyOptions.forEach(function(webpackOptions, index) {
		// The webpack tier owns the watch behavior so we want to force it in the config
		webpackOptions.watch = true;

		if(!webpackOptions.output) webpackOptions.output = {};

		// When using an array, even of length 1, we want to include the index value for the build.
		// This is due to the way that the dev server exposes commonPath for build output.
		var indexPath = includeIndex ? index + "/" : "";

		// Must have the common _js prefix on path here to avoid
		// https://github.com/webpack/webpack/issues/645
		webpackOptions.output.path = "/_js/" + indexPath;
		webpackOptions.output.publicPath = "http://" + hostname + ":" + port + "/" + indexPath;
		webpackOptions.output.filename = "[name]";
		if(includeIndex)
			webpackOptions.output.jsonpFunction = "webpackJsonp" + index;
		webpackOptions.output.chunkFilename = "[id].chunk.js";

		// Create a test reference for this particular compiler option set.
		testFiles.forEach(function(file) {
			var pattern = webpackOptions.output.publicPath + file.pattern.substring(baseWithSlash.length);

			files.push(new Pattern(pattern, false, true, false));
		});
	});

	this.wrapMocha = frameworks.indexOf('mocha') >= 0 && includeIndex;
	this.includeIndex = includeIndex;
	this.files = [];
	this.basePath = basePath;
	this.waiting = [];


	var compiler = webpack(webpackOptions);
	var applyPlugins = compiler.compilers || [compiler];
	applyPlugins.forEach(function(compiler) {
		compiler.plugin("this-compilation", function(compilation, params) {
			compilation.dependencyFactories.set(SingleEntryDependency, params.normalModuleFactory);
		});
		compiler.plugin("make", this.make.bind(this));
	}, this);

	compiler.plugin("done", function(stats) {
		var applyStats = Array.isArray(stats.stats) ? stats.stats : [stats];
		var assets = [];
		applyStats.forEach(function(stats) {
			var compilation = stats.compilation;
			stats = stats.toJson();

			assets.push.apply(assets, stats.assets.map(function(asset) {
				return {
					url: compilation.options.output.publicPath + asset.name,
					name: asset.name,
					emitted: asset.emitted
				};
			}));
		});

		if(!this.waiting || this.waiting.length === 0) {
			// If file required in tests is changed, webpack compilation is done silently for karma.
			// Fix this by emulating test file change.
			this.notifyKarmaAboutChanges(assets);
		}

		if(this.waiting && assets.length > 0) {
			var w = this.waiting;
			this.waiting = null;
			w.forEach(function(cb) {
				cb();
			});
		}
	}.bind(this));
	compiler.plugin("invalid", function() {
		if(!this.waiting) this.waiting = [];
	}.bind(this));

	var server = this.server = new webpackDevServer(compiler, webpackServerOptions);
	server.listen(port, hostname);
	emitter.on("exit", function (done) {
		server.middleware.close();
		server.listeningApp.close();
		done();
	});
}

Plugin.prototype.notifyKarmaAboutChanges = function(assets) {
	// Find recently recompiled files.
	var changedAssets = assets.filter(function (asset) {
		return asset.emitted;
	}).map(function(asset) {
		return asset.name;
	});

	// Pick files watched by karma among them.
	var changedTests = this.files.filter(function (file) {
		var assetName = path.relative(this.basePath, file).replace(/\\/g, "/");
		return changedAssets.indexOf(assetName) !== -1;
	}.bind(this));

	// Make karma to run preprocessors on changed tests.
	changedTests.forEach(function(changedTestFile) {
		this.fileList.buckets.forEach(function(bucket) {
			bucket.forEach(function(watchedFile) {
				if (watchedFile.originalPath === changedTestFile) {
					this.changeKarmaFile(watchedFile);
				}
			}.bind(this));
		}.bind(this));
	}.bind(this));
};

Plugin.prototype.addFile = function(entry) {
	if(this.files.indexOf(entry) >= 0) return;
	this.files.push(entry);
	return true;
};

Plugin.prototype.changeKarmaFile = function(watchedFile) {
	// Add and remove triggers a rebuild for karma
	this.fileList.removeFile(watchedFile.originalPath);
	this.fileList.addFile(watchedFile.originalPath);
};

Plugin.prototype.make = function(compilation, callback) {
	async.forEach(this.files.slice(), function(file, callback) {
		var entry = "./" + path.relative(this.basePath, file);
		if (this.wrapMocha) {
			entry = require.resolve("./mocha-env-loader") + "!" + entry;
		}

		var dep = new SingleEntryDependency(entry);
		compilation.addEntry("", dep, path.relative(this.basePath, file).replace(/\\/g, "/"), function() {
			// If the module fails because of an File not found error, remove the test file
			if(dep.module && dep.module.error && dep.module.error.error && dep.module.error.error.code === "ENOENT") {
				this.files = this.files.filter(function(f) {
					return file !== f;
				});
				this.server.invalidate();
			}
			callback();
		}.bind(this));
	}.bind(this), callback);
};

Plugin.prototype.readFile = function(file, callback) {
	var server = this.server;
	var includeIndex = this.includeIndex;

	function doRead() {
		server.middleware.fileSystem.readFile("/_js/" + (includeIndex ? "0/" : "") + file.replace(/\\/g, "/"), callback);
	}
	if(!this.waiting)
		doRead();
	else
		// Retry to read once a build is finished
		// do it on process.nextTick to catch changes while building
		this.waiting.push(process.nextTick.bind(process, this.readFile.bind(this, file, callback)));
};

// This has to be a separate step from the preprocessor instantiation as we need to modify
// the files array prior to the fileList instance being constructed and the Plugin
// having a dependency on fileList precludes setup there.
function createFramework(webpackPlugin) {
	// This just instantiates the plugin instance. No direct references necessary
}

function createPreprocesor(/* config.basePath */basePath, webpackPlugin, fileList) {
	webpackPlugin.fileList = fileList;

	return function(content, file, done) {

		if (!webpackPlugin.addFile(file.path)) {
			// We are already aware of this particular file. No need to rebuild since the webpack
			// server has already rebuilt this file (we assume).
			setImmediate(function() {
				done(undefined, content);
			});
			return;
		}

		// recompile
		webpackPlugin.server.invalidate();

		// read blocks until bundle is done
		webpackPlugin.readFile(path.relative(basePath, file.path), function(err, content) {
			if (err) {
				throw err;
			}
			done(err, content);
		});
	};
}

module.exports = {
	"webpackPlugin": ["type", Plugin],
	"framework:webpack": ["factory", createFramework],
	"preprocessor:webpack": ["factory", createPreprocesor]
};
