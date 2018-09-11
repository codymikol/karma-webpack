import { webpackPlugin } from '../src/karma-webpack';

describe('Plugin', () => {
  describe('#make()', () => {
    test('Defaults', (done) => {
      const emitterMock = {
        on() {},
      };
      const compilationMock = {
        addEntry(name, dep, file, cb) {
          cb(new Error('test error'));
        },
      };
      const Plugin = new webpackPlugin[1](
        {},
        {},
        {},
        '',
        [],
        [],
        true,
        true,
        [],
        emitterMock
      );

      Plugin.addFile('test.js');
      Plugin.make(compilationMock, (err) => {
        expect(err.message).toBe('test error');
        done();
      });
    });
  });
});
