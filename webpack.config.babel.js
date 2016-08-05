import path from 'path'
import {optimize} from 'webpack'
import {name, dependencies, devDependencies} from './package.json'

const {UglifyJsPlugin} = optimize

const rootPath = (nPath) => path.resolve(__dirname, nPath)
const BUILD_PATH = './dist'
const NODE_MODULES = rootPath('node_modules')
const IS_BUILD = process.env.NODE_ENV === 'production'

const CONFIG = {
  entry: './src/karma-webpack.js',
  target: 'node',

  output: {
    path: BUILD_PATH,
    filename: 'karma-webpack.js',
    library: name,
    libraryTarget: 'umd'
  },

  module: {
    loaders: [{
      test: /\.json/,
      loader: 'json'
    }, {
      test: /\.js/,
      loader: 'babel',
      exclude: [NODE_MODULES],
      query: {compact: true}
    }]
  },

  externals: Object.keys(dependencies)
    .concat(Object.keys(devDependencies))
}

if (IS_BUILD)
  CONFIG.plugins = [
    new UglifyJsPlugin({
      comments: false,
      sourceMap: false
    })
  ]

export default CONFIG
