const fs = require('fs');
const path = require('path');

const KW_Framework = require('../../../lib/karma-webpack/framework');

jest.mock('fs');

describe('KW_Framework', () => {
  test('Defaults', () => {
    const controller = { outputPath: 'foo/' };
    const config = { files: [], __karmaWebpackController: controller };
    fs.closeSync = jest.fn();
    fs.openSync = jest.fn();

    KW_Framework(config);

    expect(fs.openSync).toBeCalledWith(path.join('foo', 'commons.js'), 'w');
    expect(fs.openSync).toBeCalledWith(path.join('foo', 'runtime.js'), 'w');

    expect(config.files.length).toBe(2);
    expect(config.files).toEqual([
      {
        pattern: path.join('foo', 'runtime.js'),
        included: true,
        served: true,
        watched: false,
      },
      {
        pattern: path.join('foo', 'commons.js'),
        included: true,
        served: true,
        watched: false,
      },
    ]);
  });
});
