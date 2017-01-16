/**
 * Simple Karma Integration Test config
 *
 * JavaScript Only
 * No Sourcemaps
 *
 */
import webpack from 'webpack';

const configSettings = { // eslint-disable-line no-unused-vars
  normal: {},
  uglified: {
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
};

export default config => {
  config.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      'test/index.js'
    ],

    preprocessors: {
      'test/*': ['webpack']
    },


    webpack: {
      resolve: {
        extensions: ['', '.js']
      }
    },


    webpackMiddleware: {
      stats: {
        colors: true
      }
    },

    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    captureTimeout: 60000,

    singleRun: true,

    plugins: [
      require('karma-mocha'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('../../../dist')
    ]
  });
};
