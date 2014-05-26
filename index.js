var fs = require("fs");
var crypto = require("crypto");
var path = require("path");
var async = require("async");
var webpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var SingleEntryDependency = require("webpack/lib/dependencies/SingleEntryDependency");

function Plugin(/* config.port */karmaPort, /* config.hostname */hostname, /* config.webpackPort */port, /* config.webpack */webpackOptions, /* config.webpackServer */webpackServerOptions, /* config.basePath */basePath, fileList) {
	if(!port) port = karmaPort + 1;
	if(!hostname) hostname = "localhost";
	if(!webpackOptions) webpackOptions = {};
	if(!webpackOptions.output) webpackOptions.output = {};
	if(!webpackServerOptions) webpackServerOptions = {};

	this.files = [];
	this.basePath = basePath;
	this.waiting = [];
	this.fileList = fileList;

	webpackOptions.output.path = "/";
	webpackOptions.output.filename = "_js/[name]";
	webpackOptions.output.chunkFilename = "_js/[id].chunk.js";
	webpackOptions.output.publicPath = "http://" + hostname + ":" + port + "/";

	var compiler = webpack(webpackOptions);
	compiler.plugin("compilation", function(compilation, params) {
		compilation.dependencyFactories.set(SingleEntryDependency, params.normalModuleFactory);
	});
	compiler.plugin("done", function(stats) {
		var compilation = stats.compilation;
		stats = stats.toJson();

		if(!this.waiting || this.waiting.length === 0) {
			// If file required in tests is changed, webpack compilation is done silently for karma.
			// Fix this by emulating test file change.
			this.notifyKarmaAboutChanges(stats);
		}

		if(this.waiting && stats.assets.length > 0) {
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
	compiler.plugin("make", this.make.bind(this));
	var server = this.server = new webpackDevServer(compiler, webpackServerOptions);
	server.listen(port, hostname);
}

Plugin.prototype.notifyKarmaAboutChanges = function(stats) {
	// Find recently recompiled files.
	var changedAssets = stats.assets.filter(function (asset) {
		return asset.emitted;
	}).map(function(asset) {
		return asset.name;
	});

	// Pick files watched by karma among them.
	var changedTests = this.files.filter(function (file) {
		var assetName = "_js/" + path.relative(this.basePath, file).replace(/\\/g, "/");
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
};

Plugin.prototype.changeKarmaFile = function(watchedFile) {
	// Add and remove triggers a rebuild for karma
	this.fileList.removeFile(watchedFile.originalPath);
	this.fileList.addFile(watchedFile.originalPath);
};

Plugin.prototype.make = function(compilation, callback) {
	async.forEach(this.files.slice(), function(file, callback) {
		var dep = new SingleEntryDependency(file);
		compilation.addEntry("", dep, path.relative(this.basePath, file).replace(/\\/g, "/"), function() {
			// If the module fails because of an File not found error, remove the test file
			if(dep.module.error && dep.module.error.error && dep.module.error.error.code === "ENOENT") {
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
	function doRead() {
		server.middleware.fileSystem.readFile("/_js/"+file.replace(/\\/g, "/"), callback);
	}
	if(!this.waiting)
		doRead();
	else
		// Retry to read once a build is finished
		// do it on process.nextTick to catch changes while building
		this.waiting.push(process.nextTick.bind(process, this.readFile.bind(this, file, callback)));
}

var sha1 = function(data) {
	var hash = crypto.createHash('sha1');
	hash.update(data);
	return hash.digest('hex');
};

function createPreprocesor(/* config.basePath */basePath, webpackPlugin, logger, config) {
	var log = logger.create("preprocessor.webpack");
	return function(content, file, done) {
		webpackPlugin.karmaWaitsForPreprocessing = true;


		webpackPlugin.addFile(file.path);

		// recompile
		webpackPlugin.server.invalidate()

		// read blocks until bundle is done
		webpackPlugin.readFile(path.relative(basePath, file.path), function(err, content) {
			webpackPlugin.karmaWaitsForPreprocessing = false;
			// Hack: file.sha
			//
			// Karma v0.12 assumes preprocessing is idempotent - always returns the same result on the same input.
			// That's not true with karma-webpack. Not setting file.sha causes browser to use a cached file.
			file.sha = sha1(content);
			done(err, content && content.toString("utf-8"));
		});
	};
}

module.exports = {
	"webpackPlugin": ["type", Plugin],
	"preprocessor:webpack": ["factory", createPreprocesor]
};
