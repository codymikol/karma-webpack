describe("b-test", function() {
	it("should run another test", function() {
		var ok = 1;
	});

	it("should allow more chunks", function(done) {
		var test = true;
		require.ensure(["../fixtures/file.js?1"], function(require) {
			test = false;
			done();
		});
		if(!test) throw new Error("Chunk should be async");
	});
});