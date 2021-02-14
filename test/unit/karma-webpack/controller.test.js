const os = require('os');

const KW_Controller = require('../../../lib/karma-webpack/controller');
const DefaultWebpackOptionsFactory = require('../../../lib/webpack/defaults');

const defaultWebpackOptions = DefaultWebpackOptionsFactory.create();

describe('KW_Controller', () => {
  const EXPECTED_DEFAULT_PATH_PREFIX = '/_karma_webpack_';

  let controller;

  beforeEach(() => (controller = new KW_Controller()));

  it('initializes with a webpackOptions object', () => {
    expect(controller.webpackOptions).toBeDefined();
    expect(controller.webpackOptions).toEqual(jasmine.any(Object));
  });

  it('correctly sets the default output path prefix', () => {
    expect(
      controller.webpackOptions.output.path.startsWith(
        os.tmpdir() + EXPECTED_DEFAULT_PATH_PREFIX
      )
    ).toBeTruthy();
  });

  it('correctly postfixes a random number to the end of the webpack options output path for parallel runs', () => {
    const postfix = controller.webpackOptions.output.path.split(
      EXPECTED_DEFAULT_PATH_PREFIX
    )[1];
    expect(isNaN(postfix)).toBe(false);
  });

  it('should otherwise be equal to a newly instantiated default webpack options object', () => {
    controller.webpackOptions.output.path = EXPECTED_DEFAULT_PATH_PREFIX;
    defaultWebpackOptions.output.path = EXPECTED_DEFAULT_PATH_PREFIX;
    expect(controller.webpackOptions).toEqual(defaultWebpackOptions);
  });

  it('can provide custom nested webpackOptions', () => {
    controller.updateWebpackOptions({
      output: {
        path: 'foo',
        publicPath: 'bar',
      },
    });
    expect(controller.webpackOptions.output.path).toBe('foo');
    expect(controller.webpackOptions.output.publicPath).toBe('bar');
    expect(controller.webpackOptions.output.filename).toBe(
      defaultWebpackOptions.output.filename
    );
  });
});
