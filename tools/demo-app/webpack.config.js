import path from 'path'
import webpack from 'webpack' // eslint-disable-line no-unused-vars

/**
 * Paths
 */
const ABS_PATH = path.join(__dirname)
const DIST_DIR = path.join(ABS_PATH, 'dist')

/**
 * Exports
 */
export default {
  ABS_PATH,
  DIST_DIR,
  WEBPACK: {
    target: 'web',

    entry: {},

    module: {
      loaders: [{
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/i,
        loader: 'babel-loader?cacheDirectory=true'
      }],
    },

    output: {
      path: DIST_DIR,
      filename: '[name].js',
    },
  },
}
