const fs = require('fs');
const path = require('path');

const { registerExtraWebpackFiles } = require('../lib/karma-webpack');
const { KarmaWebpackController } = require('../lib/KarmaWebpackController.js');

jest.mock('fs');

describe('karma-webpack', () => {
  describe('registerExtraWebpackFiles()', () => {
    test('Defaults', () => {
      const controller = new KarmaWebpackController();
      controller.updateWebpackOptions({
        output: { path: 'foo/' }
      });
      const config = { files: [] };
      fs.closeSync = jest.fn();
      fs.openSync = jest.fn();

      registerExtraWebpackFiles(config, controller);

      expect(fs.openSync).toBeCalledWith(path.join('foo', 'commons.js'), 'w');
      expect(fs.openSync).toBeCalledWith(path.join('foo', 'runtime.js'), 'w');

      expect(config.files.length).toBe(2);
      expect(config.files).toEqual([
        {
          pattern: path.join('foo', 'runtime.js'),
          included: true,
          served: true,
          watched: false
        },
        {
          pattern: path.join('foo', 'commons.js'),
          included: true,
          served: true,
          watched: false
        }
      ]);
    });
  });
});
