var path = require("path");
var SourceNode = require("source-map").SourceNode;

module.exports = function(content) {
	this.cacheable();

	var callback = this.async();
	var fileName = path.relative(this.options.context, this.resource);
	var id = this.options.configName || ("Compiler " + this.options.output.path.replace(/\/_js\/(\d*).*/, "$1"));

	var sourceNode = new SourceNode(1, 0, fileName, content);
	sourceNode.setSourceContent(fileName, content);

	var concatSrc = new SourceNode();
	concatSrc.add([
		"describe(" + JSON.stringify(id)  + ", function() {\n",
		sourceNode,
		"});"
	]);

	var result = concatSrc.toStringWithSourceMap();
	callback(undefined, result.code, result.map.toString());
};
