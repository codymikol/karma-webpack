const {
  KarmaWebpackController,
  defaultWebpackOptions,
} = require('../../lib/KarmaWebpackController');

describe('KarmaWebpackController', () => {
  it('applies the default webpackOptions', () => {
    const controller = new KarmaWebpackController();
    expect(controller.webpackOptions).toEqual(defaultWebpackOptions);
  });

  it('can provide custom nested webpackOptions', () => {
    const controller = new KarmaWebpackController();
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
