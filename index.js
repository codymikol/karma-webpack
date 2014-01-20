var path = require("path");
var async = require("async");
var webpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var SingleEntryDependency = require("webpack/lib/dependencies/SingleEntryDependency");

function Plugin(/* config.port */karmaPort, /* config.hostname */hostname, /* config.webpackPort */port, /* config.webpack */webpackOptions, /* config.webpackServer */webpackServerOptions, /* config.basePath */basePath) {
	if(!port) port = karmaPort + 1;
	if(!hostname) hostname = "localhost";
	if(!webpackOptions) webpackOptions = {};
	if(!webpackOptions.output) webpackOptions.output = {};
	if(!webpackServerOptions) webpackServerOptions = {};
	
	this.files = [];
	this.basePath = basePath;
	this.waiting = [];
	
	webpackOptions.output.path = "/";
	webpackOptions.output.filename = "_js/[name]";
	webpackOptions.output.chunkFilename = "_js/[id].chunk.js";
	webpackOptions.output.publicPath = "http://" + hostname + ":" + port + "/";
	
	var compiler = webpack(webpackOptions);
	compiler.plugin("compilation", function(compilation, params) {
		compilation.dependencyFactories.set(SingleEntryDependency, params.normalModuleFactory);
	});
	compiler.plugin("done", function() {
		if(this.waiting) {
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

Plugin.prototype.addFile = function(entry) {
	if(this.files.indexOf(entry) >= 0) return;
	this.files.push(entry);
	if(!this.waiting) this.waiting = [];
	this.server.invalidate();
};

Plugin.prototype.make = function(compilation, callback) {
	async.forEach(this.files.slice(), function(file, callback) {
		compilation.addEntry("", new SingleEntryDependency(file), path.relative(this.basePath, file).replace(/\\/g, "/"), callback);
	}.bind(this), callback);
};

Plugin.prototype.readFile = function(file, callback) {
	var server = this.server;
	function doRead() {
		server.middleware.fileSystem.readFile("/_js/"+file.replace(/\\/g, "/"), callback);
	}
	if(!this.waiting) doRead();
	else this.waiting.push(doRead);
}


function createPreprocesor(/* config.basePath */basePath, webpackPlugin, logger, config) {
	var log = logger.create("preprocessor.webpack");
	return function(content, file, done) {
		webpackPlugin.addFile(file.path);
		webpackPlugin.readFile(path.relative(basePath, file.path), function(err, content) {
			if(err) return done("throw new Error(" + JSON.stringify(""+err.stack) + ")");
			done(content);
		});
	};
}

module.exports = {
	"webpackPlugin": ["type", Plugin],
	"preprocessor:webpack": ["factory", createPreprocesor]
};