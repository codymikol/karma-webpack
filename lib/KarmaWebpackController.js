/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');
const os = require('os');

const webpack = require('webpack');
const merge = require('webpack-merge');

class KarmaSyncPlugin {
  constructor(options) {
    this.karmaEmitter = options.karmaEmitter;
    this.controller = options.controller;
  }

  apply(compiler) {
    this.compiler = compiler;

    // webpack bundles are finished
    compiler.hooks.done.tap('KarmaSyncPlugin', async (stats) => {
      // read generated file content and store for karma preprocessor
      this.controller.bundlesContent = {};
      stats.toJson().assets.forEach((webpackFileObj) => {
        const filePath = `${compiler.options.output.path}/${
          webpackFileObj.name
        }`;
        this.controller.bundlesContent[webpackFileObj.name] = fs.readFileSync(
          filePath,
          'utf-8'
        );
      });

      // karma refresh
      this.karmaEmitter.refreshFiles();
    });
  }
}

const defaultWebpackOptions = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.join(os.tmpdir(), '_karma_webpack_'),
  },
  stats: {
    modules: false,
    colors: true,
  },
  watch: false,
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 1,
        },
      },
    },
  },
  plugins: [],
  // Something like this will be auto added by this.configure()
  // entry: {
  //   'foo-one.test.js': 'path/to/test/foo-one.test.js',
  //   'foo-two.test.js': 'path/to/test/foo-two.test.js',
  // },
  // plugins: [
  //   new KarmaSyncPlugin()
  // ],
};

class KarmaWebpackController {
  set webpackOptions(options) {
    this.__webpackOptions = options;
  }

  get webpackOptions() {
    return this.__webpackOptions;
  }

  set karmaEmitter(emitter) {
    this.__karmaEmitter = emitter;

    this.__webpackOptions.plugins.push(
      new KarmaSyncPlugin({
        karmaEmitter: emitter,
        controller: this,
      })
    );

    emitter.on('exit', (done) => {
      this.onKarmaExit();
      done();
    });
  }

  get karmaEmitter() {
    return this.__karmaEmitter;
  }

  get outputPath() {
    return this.webpackOptions.output.path;
  }

  constructor() {
    this.isActive = false;
    this.bundlesContent = {};
    this.hasBeenBuiltAtLeastOnce = false;
    this.webpackOptions = defaultWebpackOptions;
  }

  updateWebpackOptions(newOptions) {
    this.webpackOptions = merge(this.webpackOptions, newOptions);
  }

  async bundle() {
    if (this.isActive === false && this.hasBeenBuiltAtLeastOnce === false) {
      console.log('Webpack bundling...');
      this._activePromise = this._bundle();
    }
    return this._activePromise;
  }

  async _bundle() {
    this.isActive = true;
    this.compiler = webpack(this.webpackOptions);
    return new Promise((resolve) => {
      if (this.webpackOptions.watch === true) {
        console.log('Webpack starts watching...');
        this.webpackFileWatcher = this.compiler.watch({}, (err, stats) =>
          this.handleBuildResult(err, stats, resolve)
        );
      } else {
        this.compiler.run((err, stats) =>
          this.handleBuildResult(err, stats, resolve)
        );
      }
    });
  }

  handleBuildResult(err, stats, resolve) {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    this.isActive = false;
    this.hasBeenBuiltAtLeastOnce = true;

    console.log(stats.toString(this.webpackOptions.stats));
    resolve();
  }

  onKarmaExit() {
    if (this.webpackFileWatcher) {
      this.webpackFileWatcher.close();
      console.log('Webpack stopped watching.');
    }
  }
}

module.exports = {
  KarmaSyncPlugin,
  KarmaWebpackController,
  defaultWebpackOptions,
};
