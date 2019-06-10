import { webpackPlugin } from '../src/karma-webpack';

const emitterMock = {
  on() {},
};

function initPlugin(
  webpackOptions = {},
  webpackServerOptions = {},
  webpackMiddlewareOptions = {},
  basePath = '',
  files = [],
  frameworks = [],
  singleRun = true,
  colors = true,
  customFileHandlers = [],
  emitter = emitterMock
) {
  return new webpackPlugin[1](
    webpackOptions,
    webpackServerOptions,
    webpackMiddlewareOptions,
    basePath,
    files,
    frameworks,
    singleRun,
    colors,
    customFileHandlers,
    emitter
  );
}

describe('Plugin', () => {
  describe('Configuration', () => {
    it('should initialize correctly with defaults', () => {
      initPlugin();
    });

    it('should add a default webpack entry value if not provided', () => {
      const plugin = initPlugin({});

      // this is the only place we can access the complete webpack config
      const { options } = plugin.middleware.context.compiler;

      expect(typeof options.entry).toEqual('function');
      expect(options.entry()).toEqual({});
    });

    it('should set the output filename correctly', () => {
      const plugin = initPlugin({});

      // this is the only place we can access the complete webpack config
      const { options } = plugin.middleware.context.compiler;

      expect(options.output.filename).toEqual('[name].js');
    });

    it('should set splitChunks and runtimeChunk to false if provided', () => {
      const plugin = initPlugin({
        optimization: {
          splitChunks: true,
          runtimeChunk: true,
        },
      });

      // this is the only place we can access the complete webpack config
      const { options } = plugin.middleware.context.compiler;

      expect(options.optimization.splitChunks).toEqual(false);
      expect(options.optimization.runtimeChunk).toEqual(false);
    });

    it('should initialize correctly without webpackMiddleware configuration', () => {
      initPlugin({}, null, null);
    });

    it('should allow a multi compiler webpack configuration', () => {
      initPlugin([{}, {}]);
    });
  });

  describe('Adding Files', () => {
    it('should error when adding an entry to the compilation fails', (done) => {
      const compilationMock = {
        addEntry(name, dep, file, cb) {
          cb(new Error('test error'));
        },
      };

      const plugin = initPlugin();

      plugin.addFile('test.js');
      plugin.make(compilationMock, (err) => {
        expect(err.message).toBe('test error');

        done();
      });
    });

    it('should store files as an entry file when added', (done) => {
      const compilationMock = {
        addEntry(name, dep, file, cb) {
          cb();
        },
      };

      const plugin = initPlugin();

      plugin.addFile('test.js');
      plugin.make(compilationMock, () => {
        expect(plugin.entries.size).toBe(1);
        expect(plugin.entries.get('test')).toEqual('test.js');

        done();
      });
    });
  });
});
