describe("a-test", function() {
	it("should run a test", function() {
		var ok = 1;
	});

	it("should require a file", function() {
		var module = require("../fixtures/file.js");
		if(!module.ok) throw new Error("module didn't export ok");
	});
	
	it("should use loaders", function() {
		var module = require("../fixtures/file.coffee");
		if(!module.ok) throw new Error("module didn't export ok");
	});
	
	it("should allow chunks", function(done) {
		var test = true;
		require.ensure(["../fixtures/file.js?1"], function(require) {
			test = false;
			done();
		});
		if(!test) throw new Error("Chunk should be async");
	});
});