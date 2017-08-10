import {assert} from 'chai'
import {webpackPlugin} from '../../src/karma-webpack'

describe('Plugin', function() {
  describe('#make()', function() {
    it('should pass through error from compilation', function(done) {
      var emitterMock = {
        on() {}
      }
      var compilationMock = {
        addEntry(name, dep, file, cb) {
          cb(new Error('test error'))
        }
      }
      var Plugin = new webpackPlugin[1]({}, {}, {}, '', [], [], true, [], emitterMock)

      Plugin.addFile('test.js')
      Plugin.make(compilationMock, function(err) {
        assert.equal(err.message, 'test error')
        done()
      })
    })
  })
})
