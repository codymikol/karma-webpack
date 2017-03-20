/* eslint-disable import/no-unresolved, import/extensions */
import path from 'path';
import _ from 'lodash';
import async from 'async';
import chalk from 'chalk';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import SingleEntryDependency from 'webpack/lib/dependencies/SingleEntryDependency';

let blocked = [];
let isBlocked = false;

class Plugin {
  constructor(
    /* config.webpack */ webpackOptions,
    /* config.webpackServer */ webpackServerOptions,
    /* config.webpackMiddleware */ webpackMiddlewareOptions,
    /* config.basePath */ basePath,
    /* config.files */ files,
    /* config.frameworks */ frameworks,
    customFileHandlers,
    emitter) {
    const webpackOpts = _.clone(webpackOptions) || {};
    const webpackMiddlewareOpts = _.clone(webpackMiddlewareOptions || webpackServerOptions) || {};

    const applyOptions = Array.isArray(webpackOpts) ? webpackOpts : [webpackOpts];
    const includeIndex = applyOptions.length > 1;

    applyOptions.forEach((options, index) => {
      // The webpack tier owns the watch behavior so we want to force it in the config
      this.options.watch = true;

      // Webpack 2.1.0-beta.7+ will throw in error if both entry and plugins are not specified in options
      // https://github.com/webpack/webpack/commit/b3bc5427969e15fd3663d9a1c57dbd1eb2c94805
      if (!this.options.entry) {
        this.options.entry = () => ({}); // eslint-disable-line arrow-body-style
      }

      if (!this.options.output) {
        this.options.output = {};
      }

      // When using an array, even of length 1, we want to include the index value for the build.
      // This is due to the way that the dev server exposes commonPath for build output.
      const indexPath = includeIndex ? `${index}/` : '';
      const publicPath = indexPath !== '' ? `${indexPath}/` : '';

      // Must have the common _karma_webpack_ prefix on path here to avoid
      // https://github.com/webpack/webpack/issues/645
      this.options.output.path = `/_karma_webpack_/${indexPath}`;
      this.options.output.publicPath = `/_karma_webpack_/${publicPath}`;
      this.options.output.filename = '[name]';
      if (includeIndex) {
        this.options.output.jsonpFunction = `webpackJsonp${index}`;
      }
      this.options.output.chunkFilename = '[id].bundle.js';
    });

    this.emitter = emitter;
    this.wrapMocha = frameworks.includes('mocha') && includeIndex;
    this.optionsCount = applyOptions.length;
    this.files = [];
    this.basePath = basePath;
    this.waiting = [];

    let compiler;
    try {
      compiler = webpack(webpackOpts);
    } catch (e) {
      console.error(chalk.red(e.stack || e));
      if (e.details) {
        console.error(chalk.red(e.details));
      }
      throw e;
    }

    const applyPlugins = compiler.compilers || [compiler];

    applyPlugins.forEach((compiler) => {
      compiler.plugin('this-compilation', (compilation, params) => {
        compilation.dependencyFactories.set(SingleEntryDependency, params.normalModuleFactory);
      });
      compiler.plugin('make', this.make.bind(this));
    }, this);

    ['invalid', 'watch-run', 'run'].forEach((name) => {
      compiler.plugin(name, (_, callback) => {
        isBlocked = true;

        if (typeof callback === 'function') {
          callback();
        }
      });
    });

    compiler.plugin('done', (stats) => {
      const applyStats = Array.isArray(stats.stats) ? stats.stats : [stats];
      const assets = [];
      let noAssets = false;

      applyStats.forEach((stats) => {
        this.stats = stats.toJson();

        assets.push(...stats.assets);
        if (stats.assets.length === 0) {
          noAssets = true;
        }
      });

      if (!this.waiting || this.waiting.length === 0) {
        this.notifyKarmaAboutChanges();
      }

      if (this.waiting && !noAssets) {
        const w = this.waiting;

        this.waiting = null;
        w.forEach((cb) => {
          cb();
        });
      }

      isBlocked = false;
      for (let i = 0; i < blocked.length; i++) { // eslint-disable-line no-plusplus
        blocked[i]();
      }
      blocked = [];

      stats.compilation.warnings.forEach((warning) => {
        if (warning.file) {
          console.warn(chalk.yellow(`WARNING in ./${path.relative('', warning.file)}`));
        }
        console.warn(chalk.yellow(warning.message || warning));
      });
      stats.compilation.errors.forEach((error) => {
        if (error.file) {
          console.error(chalk.red(`ERROR in ./${path.relative('', error.file)}`));
        }
        console.error(chalk.red(error.message || error));
      });
    });
    compiler.plugin('invalid', () => {
      if (!this.waiting) {
        this.waiting = [];
      }
    });

    webpackMiddlewareOpts.publicPath = '/_karma_webpack_/';
    const middleware = this.middleware = new WebpackDevMiddleware(compiler, webpackMiddlewareOpts);  // eslint-disable-line no-multi-assign

    customFileHandlers.push({
      urlRegex: /^\/_karma_webpack_\/.*/,
      handler(req, res) {
        middleware(req, res, () => {
          res.statusCode = 404;  // eslint-disable-line no-param-reassign
          res.end('Not found');
        });
      },
    });

    emitter.on('exit', (done) => {
      middleware.close();
      done();
    });
  }

  notifyKarmaAboutChanges() {
    // Force a rebuild
    this.emitter.refreshFiles();
  }

  addFile(entry) {
    if (this.files.includes(entry)) {
      return;
    }
    this.files.push(entry);

    return true; // eslint-disable-line consistent-return
  }

  make(compilation, callback) {
    async.forEach(this.files.slice(), (file, callback) => {
      let entry = file;

      if (this.wrapMocha) {
        entry = `${require.resolve('./mocha-env-loader')}!${entry}`;
      }

      const dep = new SingleEntryDependency(entry);

      compilation.addEntry('', dep, path.relative(this.basePath, file).replace(/\\/g, '/'), () => {
        // If the module fails because of an File not found error, remove the test file
        if (dep.module && dep.module.error &&
          dep.module.error.error &&
          dep.module.error.error.code === 'ENOENT') {
          this.files = this.files.filter(f => file !== f);
          this.middleware.invalidate();
        }
        callback();
      });
    }, callback);
  }

  readFile(file, callback) {
    const { middleware } = this.middleware;
    const { optionsCount } = this.optionsCount;

    const doRead = () => {
      if (optionsCount > 1) {
        async.times(optionsCount, (idx, callback) => {
          middleware.fileSystem.readFile(`/_karma_webpack_/${idx}/${file.replace(/\\/g, '/')}`, callback);
        }, (err, contents) => { // eslint-disable-line consistent-return
          if (err) {
            return callback(err);
          }
          contents = contents.reduce((arr, x) => {  // eslint-disable-line no-param-reassign
            if (!arr) {
              return [x];
            }
            arr.push(new Buffer('\n'), x);

            return arr;
          }, null);
          callback(null, Buffer.concat(contents));
        });
      } else {
        try {
          const fileContents = middleware.fileSystem.readFileSync(`/_karma_webpack_/${file.replace(/\\/g, '/')}`);

          callback(undefined, fileContents); // eslint-disable-line no-undefined
        } catch (e) {
          // If this is an error from `readFileSync` method, wait for the next tick.
          // Credit #69 @mewdriller
          if (e.code === 'ENOENT') {
            // eslint-disable-line quotes
            this.waiting = [process.nextTick.bind(process, this.readFile.bind(this, file, callback))];

            // throw otherwise
          } else {
            callback(e);
          }
        }
      }
    };

    if (!this.waiting) {
      doRead();
    } else {
      // Retry to read once a build is finished
      // do it on process.nextTick to catch changes while building
      this.waiting.push(process.nextTick.bind(process, this.readFile.bind(this, file, callback)));
    }
  }
}

function createPreprocesor(/* config.basePath */ basePath, webpackPlugin) {
  return (content, file, done) => {
    if (webpackPlugin.addFile(file.path)) {
      // recompile as we have an asset that we have not seen before
      webpackPlugin.middleware.invalidate();
    }

    // read blocks until bundle is done
    webpackPlugin.readFile(path.relative(basePath, file.path), (err, content) => {
      if (err) {
        throw err;
      }

      done(err, content && content.toString());
    });
  };
}

function createWebpackBlocker() {
  return (request, response, next) => {
    if (isBlocked) {
      blocked.push(next);
    } else {
      next();
    }
  };
}

export default {
  webpackPlugin: ['type', Plugin],
  'preprocessor:webpack': ['factory', createPreprocesor],
  'middleware:webpackBlocker': ['factory', createWebpackBlocker],
};
