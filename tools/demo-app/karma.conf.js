import path from 'path'
import {
  WEBPACK
} from './webpack.config.js'

export default config => {
  config.set({
    basePath: path.join(__dirname, 'src'),

    files: [{
      pattern: '**/*.spec.js',
      watched: true
    }],

    preprocessors: {
      '**/*.spec.js': ['webpack']
    },

    webpack: Object.assign(WEBPACK, {
      entry: {},
      performance: {
        hints: false
      }
    }),

    webpackMiddleware: {
      stats: 'errors-only'
    },

    frameworks: ['jasmine'],
    browsers: ['PhantomJS']
  })
}
