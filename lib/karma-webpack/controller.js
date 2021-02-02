const webpack = require('webpack');
const merge = require('webpack-merge');

const KW_WebpackPlugin = require('../webpack/plugin');
const DefaultWebpackOptionsFactory = require('../webpack/defaults');

class KW_Controller {
  constructor() {
    this.isActive = false;
    this.bundlesContent = {};
    this.hasBeenBuiltAtLeastOnce = false;
    this.webpackOptions = DefaultWebpackOptionsFactory.create();
  }

  set webpackOptions(options) {
    this.__webpackOptions = options;
  }

  get webpackOptions() {
    return this.__webpackOptions;
  }

  updateWebpackOptions(newOptions) {
    if (newOptions.output && newOptions.output.filename) {
      console.warn(
        `
karma-webpack does not currently support customized filenames via
webpack output.filename, if this is something you need consider opening an issue.
defaulting ${newOptions.output.filename} to [name].js.`.trim()
      );
      delete newOptions.output.filename;
    }

    this.webpackOptions = merge(this.webpackOptions, newOptions);
  }

  set karmaEmitter(emitter) {
    this.__karmaEmitter = emitter;

    this.__webpackOptions.plugins.push(
      new KW_WebpackPlugin({
        karmaEmitter: emitter,
        controller: this,
      })
    );
  }

  get karmaEmitter() {
    return this.__karmaEmitter;
  }

  get outputPath() {
    return this.webpackOptions.output.path;
  }

  setupExitHandler(compiler) {
    this.karmaEmitter.once('exit', (done) => {
      compiler.close(() => {
        console.log('Webpack stopped watching.');
        done();
      });
    });
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

    return new Promise((resolve) => {
      if (this.webpackOptions.watch === true) {
        console.log('Webpack starts watching...');
        this.compiler = webpack(this.webpackOptions, (err, stats) =>
          this.handleBuildResult(err, stats, resolve)
        );

        this.setupExitHandler(this.compiler);
      } else {
        this.compiler = webpack(this.webpackOptions).run((err, stats) =>
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
}

module.exports = KW_Controller;
