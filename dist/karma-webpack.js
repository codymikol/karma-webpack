(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("async"), require("loader-utils"), require("lodash"), require("path"), require("source-map"), require("webpack"), require("webpack-dev-middleware"));
	else if(typeof define === 'function' && define.amd)
		define(["async", "loader-utils", "lodash", "path", "source-map", "webpack", "webpack-dev-middleware"], factory);
	else if(typeof exports === 'object')
		exports["karma-webpack"] = factory(require("async"), require("loader-utils"), require("lodash"), require("path"), require("source-map"), require("webpack"), require("webpack-dev-middleware"));
	else
		root["karma-webpack"] = factory(root["async"], root["loader-utils"], root["lodash"], root["path"], root["source-map"], root["webpack"], root["webpack-dev-middleware"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';var _stringify=__webpack_require__(7);var _stringify2=_interopRequireDefault(_stringify);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}//var path = require('path')
var SourceNode=__webpack_require__(14).SourceNode;var loaderUtils=__webpack_require__(13);module.exports=function(content,map){this.cacheable();var sourceNode;var id=this.options.name;if(!id){this.callback(null,content,map);}if(map){sourceNode=SourceNode.fromSourceWithMap(content,map);}else{var fileName=loaderUtils.getRemainingRequest(this);sourceNode=new SourceNode(null,null,null);content.split('\n').forEach(function(line,idx){sourceNode.add(new SourceNode(idx+1,0,fileName,line+'\n'));});sourceNode.setSourceContent(fileName,content);}var concatSrc=new SourceNode();concatSrc.add(['describe('+(0,_stringify2.default)(id)+', function() {\n',sourceNode,'\n});']);var result=concatSrc.toStringWithSourceMap();this.callback(undefined,result.code,result.map.toString());};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2NoYS1lbnYtbG9hZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJrTkFBQTtBQUNBLEdBQUksWUFBYSxRQUFRLFlBQVIsRUFBc0IsVUFBdkMsQ0FDQSxHQUFJLGFBQWMsUUFBUSxjQUFSLENBQWxCLENBRUEsT0FBTyxPQUFQLENBQWlCLFNBQVMsT0FBVCxDQUFrQixHQUFsQixDQUF1QixDQUN0QyxLQUFLLFNBQUwsR0FFQSxHQUFJLFdBQUosQ0FDQSxHQUFJLElBQUssS0FBSyxPQUFMLENBQWEsSUFBdEIsQ0FFQSxHQUFJLENBQUMsRUFBTCxDQUFTLENBQ1AsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFvQixPQUFwQixDQUE2QixHQUE3QixFQUNELENBRUQsR0FBSSxHQUFKLENBQVMsQ0FDUCxXQUFhLFdBQVcsaUJBQVgsQ0FBNkIsT0FBN0IsQ0FBc0MsR0FBdEMsQ0FBYixDQUNELENBRkQsSUFFTyxDQUNMLEdBQUksVUFBVyxZQUFZLG1CQUFaLENBQWdDLElBQWhDLENBQWYsQ0FFQSxXQUFhLEdBQUksV0FBSixDQUFlLElBQWYsQ0FBcUIsSUFBckIsQ0FBMkIsSUFBM0IsQ0FBYixDQUNBLFFBQVEsS0FBUixDQUFjLElBQWQsRUFBb0IsT0FBcEIsQ0FBNEIsU0FBUyxJQUFULENBQWUsR0FBZixDQUFvQixDQUM5QyxXQUFXLEdBQVgsQ0FBZSxHQUFJLFdBQUosQ0FBZSxJQUFNLENBQXJCLENBQXdCLENBQXhCLENBQTJCLFFBQTNCLENBQXFDLEtBQU8sSUFBNUMsQ0FBZixFQUNELENBRkQsRUFHQSxXQUFXLGdCQUFYLENBQTRCLFFBQTVCLENBQXNDLE9BQXRDLEVBQ0QsQ0FFRCxHQUFJLFdBQVksR0FBSSxXQUFKLEVBQWhCLENBRUEsVUFBVSxHQUFWLENBQWMsQ0FDWixZQUFjLHdCQUFlLEVBQWYsQ0FBZCxDQUFtQyxrQkFEdkIsQ0FDMkMsVUFEM0MsQ0FDdUQsT0FEdkQsQ0FBZCxFQUlBLEdBQUksUUFBUyxVQUFVLHFCQUFWLEVBQWIsQ0FFQSxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXlCLE9BQU8sSUFBaEMsQ0FBc0MsT0FBTyxHQUFQLENBQVcsUUFBWCxFQUF0QyxFQUNELENBL0JEIiwiZmlsZSI6Im1vY2hhLWVudi1sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL21pa2EvRG9jdW1lbnRzL3NpZGUva2FybWEtd2VicGFjayIsInNvdXJjZXNDb250ZW50IjpbIi8vdmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBTb3VyY2VOb2RlID0gcmVxdWlyZSgnc291cmNlLW1hcCcpLlNvdXJjZU5vZGVcbnZhciBsb2FkZXJVdGlscyA9IHJlcXVpcmUoJ2xvYWRlci11dGlscycpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGVudCwgbWFwKSB7XG4gIHRoaXMuY2FjaGVhYmxlKClcblxuICB2YXIgc291cmNlTm9kZVxuICB2YXIgaWQgPSB0aGlzLm9wdGlvbnMubmFtZVxuXG4gIGlmICghaWQpIHtcbiAgICB0aGlzLmNhbGxiYWNrKG51bGwsIGNvbnRlbnQsIG1hcClcbiAgfVxuXG4gIGlmIChtYXApIHtcbiAgICBzb3VyY2VOb2RlID0gU291cmNlTm9kZS5mcm9tU291cmNlV2l0aE1hcChjb250ZW50LCBtYXApXG4gIH0gZWxzZSB7XG4gICAgdmFyIGZpbGVOYW1lID0gbG9hZGVyVXRpbHMuZ2V0UmVtYWluaW5nUmVxdWVzdCh0aGlzKVxuXG4gICAgc291cmNlTm9kZSA9IG5ldyBTb3VyY2VOb2RlKG51bGwsIG51bGwsIG51bGwpXG4gICAgY29udGVudC5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbihsaW5lLCBpZHgpIHtcbiAgICAgIHNvdXJjZU5vZGUuYWRkKG5ldyBTb3VyY2VOb2RlKGlkeCArIDEsIDAsIGZpbGVOYW1lLCBsaW5lICsgJ1xcbicpKVxuICAgIH0pXG4gICAgc291cmNlTm9kZS5zZXRTb3VyY2VDb250ZW50KGZpbGVOYW1lLCBjb250ZW50KVxuICB9XG5cbiAgdmFyIGNvbmNhdFNyYyA9IG5ldyBTb3VyY2VOb2RlKClcblxuICBjb25jYXRTcmMuYWRkKFtcbiAgICAnZGVzY3JpYmUoJyArIEpTT04uc3RyaW5naWZ5KGlkKSArICcsIGZ1bmN0aW9uKCkge1xcbicsIHNvdXJjZU5vZGUsICdcXG59KTsnXG4gIF0pXG5cbiAgdmFyIHJlc3VsdCA9IGNvbmNhdFNyYy50b1N0cmluZ1dpdGhTb3VyY2VNYXAoKVxuXG4gIHRoaXMuY2FsbGJhY2sodW5kZWZpbmVkLCByZXN1bHQuY29kZSwgcmVzdWx0Lm1hcC50b1N0cmluZygpKVxufVxuIl19

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ModuleDependency = __webpack_require__(12);

function SingleEntryDependency(request) {
	ModuleDependency.call(this, request);
}
module.exports = SingleEntryDependency;

SingleEntryDependency.prototype = Object.create(ModuleDependency.prototype);
SingleEntryDependency.prototype.constructor = SingleEntryDependency;
SingleEntryDependency.prototype.type = "single entry";


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var core  = __webpack_require__(9)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ },
/* 9 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
function Dependency() {
	this.module = null;
}
module.exports = Dependency;

Dependency.prototype.isEqualResource = function( /* other */ ) {
	return false;
};

// Returns the referenced module and export
Dependency.prototype.getReference = function() {
	if(!this.module) return null;
	return {
		module: this.module,
		importedNames: true, // true: full object, false: only sideeffects/no export, array of strings: the exports with this names
	}
};

Dependency.prototype.getWarnings = function() {
	return null;
};

Dependency.prototype.updateHash = function(hash) {
	hash.update((this.module && this.module.id) + "");
};

Dependency.prototype.disconnect = function() {
	this.module = null;
};

Dependency.compare = function(a, b) {
	return Dependency.compareLocations(a.loc, b.loc);
};

Dependency.compareLocations = __webpack_require__(11);


/***/ },
/* 11 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function compareLocations(a, b) {
	if(typeof a === "string") {
		if(typeof b === "string") {
			if(a < b) return -1;
			if(a > b) return 1;
			return 0;
		} else if(typeof b === "object") {
			return 1;
		} else {
			return 0;
		}
	} else if(typeof a === "object") {
		if(typeof b === "string") {
			return -1;
		} else if(typeof b === "object") {
			if(a.start) a = a.start;
			if(b.start) b = b.start;
			if(a.line < b.line) return -1;
			if(a.line > b.line) return 1;
			if(a.column < b.column) return -1;
			if(a.column > b.column) return 1;
			if(a.index < b.index) return -1;
			if(a.index > b.index) return 1;
			return 0;
		} else {
			return 0;
		}
	}
};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var Dependency = __webpack_require__(10);

function ModuleDependency(request) {
	Dependency.call(this);
	this.request = request;
	this.userRequest = request;
}
module.exports = ModuleDependency;

ModuleDependency.prototype = Object.create(Dependency.prototype);
ModuleDependency.prototype.constructor = ModuleDependency;
ModuleDependency.prototype.isEqualResource = function isEqualResource(other) {
	if(!(other instanceof ModuleDependency))
		return false;
	return this.request === other.request;
};


/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';var _=__webpack_require__(3);var path=__webpack_require__(4);var async=__webpack_require__(2);var webpackDevMiddleware=__webpack_require__(6);var webpack=__webpack_require__(5);var SingleEntryDependency=__webpack_require__(1);var blocked=[];var isBlocked=false;function Plugin(/* config.webpack */webpackOptions,/* config.webpackServer */webpackServerOptions,/* config.webpackMiddleware */webpackMiddlewareOptions,/* config.basePath */basePath,/* config.files */files,/* config.frameworks */frameworks,customFileHandlers,emitter){webpackOptions=_.clone(webpackOptions)||{};webpackMiddlewareOptions=_.clone(webpackMiddlewareOptions||webpackServerOptions)||{};var applyOptions=Array.isArray(webpackOptions)?webpackOptions:[webpackOptions];var includeIndex=applyOptions.length>1;applyOptions.forEach(function(webpackOptions,index){// The webpack tier owns the watch behavior so we want to force it in the config
webpackOptions.watch=true;// Webpack 2.1.0-beta.7+ will throw in error if both entry and plugins are not specified in options
// https://github.com/webpack/webpack/commit/b3bc5427969e15fd3663d9a1c57dbd1eb2c94805
if(!webpackOptions.entry){webpackOptions.entry={};};if(!webpackOptions.output){webpackOptions.output={};};// When using an array, even of length 1, we want to include the index value for the build.
// This is due to the way that the dev server exposes commonPath for build output.
var indexPath=includeIndex?index+'/':'';var publicPath=indexPath!==''?indexPath+'/':'';// Must have the common _karma_webpack_ prefix on path here to avoid
// https://github.com/webpack/webpack/issues/645
webpackOptions.output.path='/_karma_webpack_/'+indexPath;webpackOptions.output.publicPath='/_karma_webpack_/'+publicPath;webpackOptions.output.filename='[name]';if(includeIndex){webpackOptions.output.jsonpFunction='webpackJsonp'+index;}webpackOptions.output.chunkFilename='[id].bundle.js';});this.emitter=emitter;this.wrapMocha=frameworks.indexOf('mocha')>=0&&includeIndex;this.optionsCount=applyOptions.length;this.files=[];this.basePath=basePath;this.waiting=[];var compiler=webpack(webpackOptions);var applyPlugins=compiler.compilers||[compiler];applyPlugins.forEach(function(compiler){compiler.plugin('this-compilation',function(compilation,params){compilation.dependencyFactories.set(SingleEntryDependency,params.normalModuleFactory);});compiler.plugin('make',this.make.bind(this));},this);['invalid','watch-run','run'].forEach(function(name){compiler.plugin(name,function(_,callback){isBlocked=true;if(typeof callback==='function'){callback();}});});compiler.plugin('done',function(stats){var applyStats=Array.isArray(stats.stats)?stats.stats:[stats];var assets=[];var noAssets=false;applyStats.forEach(function(stats){stats=stats.toJson();assets.push.apply(assets,stats.assets);if(stats.assets.length===0){noAssets=true;}});if(!this.waiting||this.waiting.length===0){this.notifyKarmaAboutChanges();}if(this.waiting&&!noAssets){var w=this.waiting;this.waiting=null;w.forEach(function(cb){cb();});}isBlocked=false;for(var i=0;i<blocked.length;i++){blocked[i]();}blocked=[];}.bind(this));compiler.plugin('invalid',function(){if(!this.waiting){this.waiting=[];}}.bind(this));webpackMiddlewareOptions.publicPath='/_karma_webpack_/';var middleware=this.middleware=new webpackDevMiddleware(compiler,webpackMiddlewareOptions);customFileHandlers.push({urlRegex:/^\/_karma_webpack_\/.*/,handler:function handler(req,res){middleware(req,res,function(){res.statusCode=404;res.end('Not found');});}});emitter.on('exit',function(done){middleware.close();done();});}Plugin.prototype.notifyKarmaAboutChanges=function(){// Force a rebuild
this.emitter.refreshFiles();};Plugin.prototype.addFile=function(entry){if(this.files.indexOf(entry)>=0){return;}this.files.push(entry);return true;};Plugin.prototype.make=function(compilation,callback){async.forEach(this.files.slice(),function(file,callback){var entry=file;if(this.wrapMocha){entry=/*require.resolve*/(0)+'!'+entry;}var dep=new SingleEntryDependency(entry);compilation.addEntry('',dep,path.relative(this.basePath,file).replace(/\\/g,'/'),function(){// If the module fails because of an File not found error, remove the test file
if(dep.module&&dep.module.error&&dep.module.error.error&&dep.module.error.error.code==='ENOENT'){this.files=this.files.filter(function(f){return file!==f;});this.middleware.invalidate();}callback();}.bind(this));}.bind(this),callback);};Plugin.prototype.readFile=function(file,callback){var middleware=this.middleware;var optionsCount=this.optionsCount;function doRead(){if(optionsCount>1){async.times(optionsCount,function(idx,callback){middleware.fileSystem.readFile('/_karma_webpack_/'+idx+'/'+file.replace(/\\/g,'/'),callback);},function(err,contents){if(err){return callback(err);};contents=contents.reduce(function(arr,x){if(!arr){return[x];};arr.push(new Buffer('\n'),x);return arr;},null);callback(null,Buffer.concat(contents));});}else{middleware.fileSystem.readFile('/_karma_webpack_/'+file.replace(/\\/g,'/'),callback);}}if(!this.waiting){doRead();}else{// Retry to read once a build is finished
// do it on process.nextTick to catch changes while building
this.waiting.push(process.nextTick.bind(process,this.readFile.bind(this,file,callback)));}};function createPreprocesor(/* config.basePath */basePath,webpackPlugin){return function(content,file,done){if(webpackPlugin.addFile(file.path)){// recompile as we have an asset that we have not seen before
webpackPlugin.middleware.invalidate();}// read blocks until bundle is done
webpackPlugin.readFile(path.relative(basePath,file.path),function(err,content){if(err){throw err;}done(err,content&&content.toString());});};}function createWebpackBlocker(){return function(request,response,next){if(isBlocked){blocked.push(next);}else{next();}};}module.exports={webpackPlugin:['type',Plugin],'preprocessor:webpack':['factory',createPreprocesor],'middleware:webpackBlocker':['factory',createWebpackBlocker]};
//# sourceMappingURL=data:application/json;base64,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QUNGLENBakNELENBbUNBLFFBQVMsa0JBQVQsQ0FBMkIscUJBQXNCLFFBQWpELENBQTJELGFBQTNELENBQTBFLENBQ3hFLE1BQU8sVUFBUyxPQUFULENBQWtCLElBQWxCLENBQXdCLElBQXhCLENBQThCLENBQ25DLEdBQUksY0FBYyxPQUFkLENBQXNCLEtBQUssSUFBM0IsQ0FBSixDQUFzQyxDQUNwQztBQUNBLGNBQWMsVUFBZCxDQUF5QixVQUF6QixHQUNELENBRUQ7QUFDQSxjQUFjLFFBQWQsQ0FBdUIsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF3QixLQUFLLElBQTdCLENBQXZCLENBQTJELFNBQVMsR0FBVCxDQUFjLE9BQWQsQ0FBdUIsQ0FDaEYsR0FBSSxHQUFKLENBQVMsQ0FDUCxLQUFNLElBQU4sQ0FDRCxDQUVELEtBQUssR0FBTCxDQUFVLFNBQVcsUUFBUSxRQUFSLEVBQXJCLEVBQ0QsQ0FORCxFQU9ELENBZEQsQ0FlRCxDQUVELFFBQVMscUJBQVQsRUFBZ0MsQ0FDOUIsTUFBTyxVQUFTLE9BQVQsQ0FBa0IsUUFBbEIsQ0FBNEIsSUFBNUIsQ0FBa0MsQ0FDdkMsR0FBSSxTQUFKLENBQWUsQ0FDYixRQUFRLElBQVIsQ0FBYSxJQUFiLEVBQ0QsQ0FGRCxJQUVPLENBQ0wsT0FDRCxDQUNGLENBTkQsQ0FPRCxDQUVELE9BQU8sT0FBUCxDQUFpQixDQUNmLGNBQWUsQ0FBQyxNQUFELENBQVMsTUFBVCxDQURBLENBRWYsdUJBQXdCLENBQUMsU0FBRCxDQUFZLGlCQUFaLENBRlQsQ0FHZiw0QkFBNkIsQ0FBQyxTQUFELENBQVksb0JBQVosQ0FIZCxDQUFqQiIsImZpbGUiOiJrYXJtYS13ZWJwYWNrLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9taWthL0RvY3VtZW50cy9zaWRlL2thcm1hLXdlYnBhY2siLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKVxudmFyIHdlYnBhY2tEZXZNaWRkbGV3YXJlID0gcmVxdWlyZSgnd2VicGFjay1kZXYtbWlkZGxld2FyZScpXG52YXIgd2VicGFjayA9IHJlcXVpcmUoJ3dlYnBhY2snKVxudmFyIFNpbmdsZUVudHJ5RGVwZW5kZW5jeSA9IHJlcXVpcmUoJ3dlYnBhY2svbGliL2RlcGVuZGVuY2llcy9TaW5nbGVFbnRyeURlcGVuZGVuY3knKVxuXG52YXIgYmxvY2tlZCA9IFtdXG52YXIgaXNCbG9ja2VkID0gZmFsc2VcblxuZnVuY3Rpb24gUGx1Z2luKFxuXHQvKiBjb25maWcud2VicGFjayAqLyB3ZWJwYWNrT3B0aW9ucyxcblx0LyogY29uZmlnLndlYnBhY2tTZXJ2ZXIgKi8gd2VicGFja1NlcnZlck9wdGlvbnMsXG5cdC8qIGNvbmZpZy53ZWJwYWNrTWlkZGxld2FyZSAqLyB3ZWJwYWNrTWlkZGxld2FyZU9wdGlvbnMsXG5cdC8qIGNvbmZpZy5iYXNlUGF0aCAqLyBiYXNlUGF0aCxcblx0LyogY29uZmlnLmZpbGVzICovIGZpbGVzLFxuXHQvKiBjb25maWcuZnJhbWV3b3JrcyAqLyBmcmFtZXdvcmtzLFxuXHRjdXN0b21GaWxlSGFuZGxlcnMsXG5cdGVtaXR0ZXIpIHtcbiAgd2VicGFja09wdGlvbnMgPSBfLmNsb25lKHdlYnBhY2tPcHRpb25zKSB8fCB7fVxuICB3ZWJwYWNrTWlkZGxld2FyZU9wdGlvbnMgPSBfLmNsb25lKHdlYnBhY2tNaWRkbGV3YXJlT3B0aW9ucyB8fCB3ZWJwYWNrU2VydmVyT3B0aW9ucykgfHwge31cblxuICB2YXIgYXBwbHlPcHRpb25zID0gQXJyYXkuaXNBcnJheSh3ZWJwYWNrT3B0aW9ucykgPyB3ZWJwYWNrT3B0aW9ucyA6IFt3ZWJwYWNrT3B0aW9uc11cbiAgdmFyIGluY2x1ZGVJbmRleCA9IGFwcGx5T3B0aW9ucy5sZW5ndGggPiAxXG5cbiAgYXBwbHlPcHRpb25zLmZvckVhY2goZnVuY3Rpb24od2VicGFja09wdGlvbnMsIGluZGV4KSB7XG4gICAgLy8gVGhlIHdlYnBhY2sgdGllciBvd25zIHRoZSB3YXRjaCBiZWhhdmlvciBzbyB3ZSB3YW50IHRvIGZvcmNlIGl0IGluIHRoZSBjb25maWdcbiAgICB3ZWJwYWNrT3B0aW9ucy53YXRjaCA9IHRydWVcblxuICAgIC8vIFdlYnBhY2sgMi4xLjAtYmV0YS43KyB3aWxsIHRocm93IGluIGVycm9yIGlmIGJvdGggZW50cnkgYW5kIHBsdWdpbnMgYXJlIG5vdCBzcGVjaWZpZWQgaW4gb3B0aW9uc1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrL3dlYnBhY2svY29tbWl0L2IzYmM1NDI3OTY5ZTE1ZmQzNjYzZDlhMWM1N2RiZDFlYjJjOTQ4MDVcbiAgICBpZiAoIXdlYnBhY2tPcHRpb25zLmVudHJ5KSB7XG4gICAgICB3ZWJwYWNrT3B0aW9ucy5lbnRyeSA9IHt9XG4gICAgfTtcblxuICAgIGlmICghd2VicGFja09wdGlvbnMub3V0cHV0KSB7XG4gICAgICB3ZWJwYWNrT3B0aW9ucy5vdXRwdXQgPSB7fVxuICAgIH07XG5cbiAgICAvLyBXaGVuIHVzaW5nIGFuIGFycmF5LCBldmVuIG9mIGxlbmd0aCAxLCB3ZSB3YW50IHRvIGluY2x1ZGUgdGhlIGluZGV4IHZhbHVlIGZvciB0aGUgYnVpbGQuXG4gICAgLy8gVGhpcyBpcyBkdWUgdG8gdGhlIHdheSB0aGF0IHRoZSBkZXYgc2VydmVyIGV4cG9zZXMgY29tbW9uUGF0aCBmb3IgYnVpbGQgb3V0cHV0LlxuICAgIHZhciBpbmRleFBhdGggPSBpbmNsdWRlSW5kZXggPyBpbmRleCArICcvJyA6ICcnXG4gICAgdmFyIHB1YmxpY1BhdGggPSBpbmRleFBhdGggIT09ICcnID8gaW5kZXhQYXRoICsgJy8nIDogJydcblxuICAgIC8vIE11c3QgaGF2ZSB0aGUgY29tbW9uIF9rYXJtYV93ZWJwYWNrXyBwcmVmaXggb24gcGF0aCBoZXJlIHRvIGF2b2lkXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2svd2VicGFjay9pc3N1ZXMvNjQ1XG4gICAgd2VicGFja09wdGlvbnMub3V0cHV0LnBhdGggPSAnL19rYXJtYV93ZWJwYWNrXy8nICsgaW5kZXhQYXRoXG4gICAgd2VicGFja09wdGlvbnMub3V0cHV0LnB1YmxpY1BhdGggPSAnL19rYXJtYV93ZWJwYWNrXy8nICsgcHVibGljUGF0aFxuICAgIHdlYnBhY2tPcHRpb25zLm91dHB1dC5maWxlbmFtZSA9ICdbbmFtZV0nXG4gICAgaWYgKGluY2x1ZGVJbmRleCkge1xuICAgICAgd2VicGFja09wdGlvbnMub3V0cHV0Lmpzb25wRnVuY3Rpb24gPSAnd2VicGFja0pzb25wJyArIGluZGV4XG4gICAgfVxuICAgIHdlYnBhY2tPcHRpb25zLm91dHB1dC5jaHVua0ZpbGVuYW1lID0gJ1tpZF0uYnVuZGxlLmpzJ1xuICB9KVxuXG4gIHRoaXMuZW1pdHRlciA9IGVtaXR0ZXJcbiAgdGhpcy53cmFwTW9jaGEgPSBmcmFtZXdvcmtzLmluZGV4T2YoJ21vY2hhJykgPj0gMCAmJiBpbmNsdWRlSW5kZXhcbiAgdGhpcy5vcHRpb25zQ291bnQgPSBhcHBseU9wdGlvbnMubGVuZ3RoXG4gIHRoaXMuZmlsZXMgPSBbXVxuICB0aGlzLmJhc2VQYXRoID0gYmFzZVBhdGhcbiAgdGhpcy53YWl0aW5nID0gW11cblxuICB2YXIgY29tcGlsZXIgPSB3ZWJwYWNrKHdlYnBhY2tPcHRpb25zKVxuICB2YXIgYXBwbHlQbHVnaW5zID0gY29tcGlsZXIuY29tcGlsZXJzIHx8IFtjb21waWxlcl1cblxuICBhcHBseVBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbihjb21waWxlcikge1xuICAgIGNvbXBpbGVyLnBsdWdpbigndGhpcy1jb21waWxhdGlvbicsIGZ1bmN0aW9uKGNvbXBpbGF0aW9uLCBwYXJhbXMpIHtcbiAgICAgIGNvbXBpbGF0aW9uLmRlcGVuZGVuY3lGYWN0b3JpZXMuc2V0KFNpbmdsZUVudHJ5RGVwZW5kZW5jeSwgcGFyYW1zLm5vcm1hbE1vZHVsZUZhY3RvcnkpXG4gICAgfSlcbiAgICBjb21waWxlci5wbHVnaW4oJ21ha2UnLCB0aGlzLm1ha2UuYmluZCh0aGlzKSlcbiAgfSwgdGhpcyk7XG5cbiAgWydpbnZhbGlkJywgJ3dhdGNoLXJ1bicsICdydW4nXS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb21waWxlci5wbHVnaW4obmFtZSwgZnVuY3Rpb24oXywgY2FsbGJhY2spIHtcbiAgICAgIGlzQmxvY2tlZCA9IHRydWVcblxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICBjb21waWxlci5wbHVnaW4oJ2RvbmUnLCBmdW5jdGlvbihzdGF0cykge1xuICAgIHZhciBhcHBseVN0YXRzID0gQXJyYXkuaXNBcnJheShzdGF0cy5zdGF0cykgPyBzdGF0cy5zdGF0cyA6IFtzdGF0c11cbiAgICB2YXIgYXNzZXRzID0gW11cbiAgICB2YXIgbm9Bc3NldHMgPSBmYWxzZVxuXG4gICAgYXBwbHlTdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICBzdGF0cyA9IHN0YXRzLnRvSnNvbigpXG5cbiAgICAgIGFzc2V0cy5wdXNoLmFwcGx5KGFzc2V0cywgc3RhdHMuYXNzZXRzKVxuICAgICAgaWYgKHN0YXRzLmFzc2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbm9Bc3NldHMgPSB0cnVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICghdGhpcy53YWl0aW5nIHx8IHRoaXMud2FpdGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubm90aWZ5S2FybWFBYm91dENoYW5nZXMoKVxuICAgIH1cblxuICAgIGlmICh0aGlzLndhaXRpbmcgJiYgIW5vQXNzZXRzKSB7XG4gICAgICB2YXIgdyA9IHRoaXMud2FpdGluZ1xuXG4gICAgICB0aGlzLndhaXRpbmcgPSBudWxsXG4gICAgICB3LmZvckVhY2goZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgY2IoKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpc0Jsb2NrZWQgPSBmYWxzZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tlZC5sZW5ndGg7IGkrKykge1xuICAgICAgYmxvY2tlZFtpXSgpXG4gICAgfVxuICAgIGJsb2NrZWQgPSBbXVxuICB9LmJpbmQodGhpcykpXG4gIGNvbXBpbGVyLnBsdWdpbignaW52YWxpZCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy53YWl0aW5nKSB7XG4gICAgICB0aGlzLndhaXRpbmcgPSBbXVxuICAgIH1cbiAgfS5iaW5kKHRoaXMpKVxuXG4gIHdlYnBhY2tNaWRkbGV3YXJlT3B0aW9ucy5wdWJsaWNQYXRoID0gJy9fa2FybWFfd2VicGFja18vJ1xuICB2YXIgbWlkZGxld2FyZSA9IHRoaXMubWlkZGxld2FyZSA9IG5ldyB3ZWJwYWNrRGV2TWlkZGxld2FyZShjb21waWxlciwgd2VicGFja01pZGRsZXdhcmVPcHRpb25zKVxuXG4gIGN1c3RvbUZpbGVIYW5kbGVycy5wdXNoKHtcbiAgICB1cmxSZWdleDogL15cXC9fa2FybWFfd2VicGFja19cXC8uKi8sXG4gICAgaGFuZGxlcjogZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgICAgIG1pZGRsZXdhcmUocmVxLCByZXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwNFxuICAgICAgICByZXMuZW5kKCdOb3QgZm91bmQnKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgZW1pdHRlci5vbignZXhpdCcsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICBtaWRkbGV3YXJlLmNsb3NlKClcbiAgICBkb25lKClcbiAgfSlcbn1cblxuUGx1Z2luLnByb3RvdHlwZS5ub3RpZnlLYXJtYUFib3V0Q2hhbmdlcyA9IGZ1bmN0aW9uKCkge1xuICAvLyBGb3JjZSBhIHJlYnVpbGRcbiAgdGhpcy5lbWl0dGVyLnJlZnJlc2hGaWxlcygpXG59XG5cblBsdWdpbi5wcm90b3R5cGUuYWRkRmlsZSA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gIGlmICh0aGlzLmZpbGVzLmluZGV4T2YoZW50cnkpID49IDApIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLmZpbGVzLnB1c2goZW50cnkpXG5cbiAgcmV0dXJuIHRydWVcbn1cblxuUGx1Z2luLnByb3RvdHlwZS5tYWtlID0gZnVuY3Rpb24oY29tcGlsYXRpb24sIGNhbGxiYWNrKSB7XG4gIGFzeW5jLmZvckVhY2godGhpcy5maWxlcy5zbGljZSgpLCBmdW5jdGlvbihmaWxlLCBjYWxsYmFjaykge1xuICAgIHZhciBlbnRyeSA9IGZpbGVcblxuICAgIGlmICh0aGlzLndyYXBNb2NoYSkge1xuICAgICAgZW50cnkgPSByZXF1aXJlLnJlc29sdmUoJy4vbW9jaGEtZW52LWxvYWRlcicpICsgJyEnICsgZW50cnlcbiAgICB9XG5cbiAgICB2YXIgZGVwID0gbmV3IFNpbmdsZUVudHJ5RGVwZW5kZW5jeShlbnRyeSlcblxuICAgIGNvbXBpbGF0aW9uLmFkZEVudHJ5KCcnLCBkZXAsIHBhdGgucmVsYXRpdmUodGhpcy5iYXNlUGF0aCwgZmlsZSkucmVwbGFjZSgvXFxcXC9nLCAnLycpLCBmdW5jdGlvbigpIHtcbiAgICAgIC8vIElmIHRoZSBtb2R1bGUgZmFpbHMgYmVjYXVzZSBvZiBhbiBGaWxlIG5vdCBmb3VuZCBlcnJvciwgcmVtb3ZlIHRoZSB0ZXN0IGZpbGVcbiAgICAgIGlmIChkZXAubW9kdWxlICYmIGRlcC5tb2R1bGUuZXJyb3IgJiZcbiAgICAgICAgZGVwLm1vZHVsZS5lcnJvci5lcnJvciAmJlxuICAgICAgICBkZXAubW9kdWxlLmVycm9yLmVycm9yLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICAgIHRoaXMuZmlsZXMgPSB0aGlzLmZpbGVzLmZpbHRlcihmdW5jdGlvbihmKSB7XG4gICAgICAgICAgcmV0dXJuIGZpbGUgIT09IGZcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5taWRkbGV3YXJlLmludmFsaWRhdGUoKVxuICAgICAgfVxuICAgICAgY2FsbGJhY2soKVxuICAgIH0uYmluZCh0aGlzKSlcbiAgfS5iaW5kKHRoaXMpLCBjYWxsYmFjaylcbn1cblxuUGx1Z2luLnByb3RvdHlwZS5yZWFkRmlsZSA9IGZ1bmN0aW9uKGZpbGUsIGNhbGxiYWNrKSB7XG4gIHZhciBtaWRkbGV3YXJlID0gdGhpcy5taWRkbGV3YXJlXG4gIHZhciBvcHRpb25zQ291bnQgPSB0aGlzLm9wdGlvbnNDb3VudFxuXG4gIGZ1bmN0aW9uIGRvUmVhZCgpIHtcbiAgICBpZiAob3B0aW9uc0NvdW50ID4gMSkge1xuICAgICAgYXN5bmMudGltZXMob3B0aW9uc0NvdW50LCBmdW5jdGlvbihpZHgsIGNhbGxiYWNrKSB7XG4gICAgICAgIG1pZGRsZXdhcmUuZmlsZVN5c3RlbS5yZWFkRmlsZSgnL19rYXJtYV93ZWJwYWNrXy8nICsgaWR4ICsgJy8nICsgZmlsZS5yZXBsYWNlKC9cXFxcL2csICcvJyksIGNhbGxiYWNrKVxuICAgICAgfSwgZnVuY3Rpb24oZXJyLCBjb250ZW50cykge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgfTtcbiAgICAgICAgY29udGVudHMgPSBjb250ZW50cy5yZWR1Y2UoZnVuY3Rpb24oYXJyLCB4KSB7XG4gICAgICAgICAgaWYgKCFhcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBbeF1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGFyci5wdXNoKG5ldyBCdWZmZXIoJ1xcbicpLCB4KVxuXG4gICAgICAgICAgcmV0dXJuIGFyclxuICAgICAgICB9LCBudWxsKVxuICAgICAgICBjYWxsYmFjayhudWxsLCBCdWZmZXIuY29uY2F0KGNvbnRlbnRzKSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG1pZGRsZXdhcmUuZmlsZVN5c3RlbS5yZWFkRmlsZSgnL19rYXJtYV93ZWJwYWNrXy8nICsgZmlsZS5yZXBsYWNlKC9cXFxcL2csICcvJyksIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuICBpZiAoIXRoaXMud2FpdGluZykge1xuICAgIGRvUmVhZCgpXG4gIH0gZWxzZSB7XG4gICAgLy8gUmV0cnkgdG8gcmVhZCBvbmNlIGEgYnVpbGQgaXMgZmluaXNoZWRcbiAgICAvLyBkbyBpdCBvbiBwcm9jZXNzLm5leHRUaWNrIHRvIGNhdGNoIGNoYW5nZXMgd2hpbGUgYnVpbGRpbmdcbiAgICB0aGlzLndhaXRpbmcucHVzaChwcm9jZXNzLm5leHRUaWNrLmJpbmQocHJvY2VzcywgdGhpcy5yZWFkRmlsZS5iaW5kKHRoaXMsIGZpbGUsIGNhbGxiYWNrKSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJlcHJvY2Vzb3IoLyogY29uZmlnLmJhc2VQYXRoICovIGJhc2VQYXRoLCB3ZWJwYWNrUGx1Z2luKSB7XG4gIHJldHVybiBmdW5jdGlvbihjb250ZW50LCBmaWxlLCBkb25lKSB7XG4gICAgaWYgKHdlYnBhY2tQbHVnaW4uYWRkRmlsZShmaWxlLnBhdGgpKSB7XG4gICAgICAvLyByZWNvbXBpbGUgYXMgd2UgaGF2ZSBhbiBhc3NldCB0aGF0IHdlIGhhdmUgbm90IHNlZW4gYmVmb3JlXG4gICAgICB3ZWJwYWNrUGx1Z2luLm1pZGRsZXdhcmUuaW52YWxpZGF0ZSgpXG4gICAgfVxuXG4gICAgLy8gcmVhZCBibG9ja3MgdW50aWwgYnVuZGxlIGlzIGRvbmVcbiAgICB3ZWJwYWNrUGx1Z2luLnJlYWRGaWxlKHBhdGgucmVsYXRpdmUoYmFzZVBhdGgsIGZpbGUucGF0aCksIGZ1bmN0aW9uKGVyciwgY29udGVudCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICB0aHJvdyBlcnJcbiAgICAgIH1cblxuICAgICAgZG9uZShlcnIsIGNvbnRlbnQgJiYgY29udGVudC50b1N0cmluZygpKVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlV2VicGFja0Jsb2NrZXIoKSB7XG4gIHJldHVybiBmdW5jdGlvbihyZXF1ZXN0LCByZXNwb25zZSwgbmV4dCkge1xuICAgIGlmIChpc0Jsb2NrZWQpIHtcbiAgICAgIGJsb2NrZWQucHVzaChuZXh0KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0KClcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHdlYnBhY2tQbHVnaW46IFsndHlwZScsIFBsdWdpbl0sXG4gICdwcmVwcm9jZXNzb3I6d2VicGFjayc6IFsnZmFjdG9yeScsIGNyZWF0ZVByZXByb2Nlc29yXSxcbiAgJ21pZGRsZXdhcmU6d2VicGFja0Jsb2NrZXInOiBbJ2ZhY3RvcnknLCBjcmVhdGVXZWJwYWNrQmxvY2tlcl1cbn1cbiJdfQ==

/***/ }
/******/ ])
});
;