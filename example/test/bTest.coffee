describe "b-test", ->
	it "should run another test", ->
		ok = 1

	it "should allow more chunks", (done) ->
		test = true
		require.ensure ["../fixtures/file.js?1"], (require) ->
			test = false
			done()
		throw new Error("Chunk should be async") unless test
