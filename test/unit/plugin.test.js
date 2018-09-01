'use strict';

const { assert } = require('chai');
const { webpackPlugin } = require('../../src/karma-webpack');

describe('Plugin', () => {
  describe('#make()', () => {
    it('should pass through error from compilation', (done) => {
      const emitterMock = {
        on() {}
      };
      const compilationMock = {
        addEntry(name, dep, file, cb) {
          cb(new Error('test error'));
        }
      };
      const Plugin = new webpackPlugin[1]({}, {}, {}, '', [], [], true, [], emitterMock);

      Plugin.addFile('test.js');
      Plugin.make(compilationMock, (err) => {
        assert.equal(err.message, 'test error');
        done();
      });
    });
  });
});
