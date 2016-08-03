import path from 'path'
import {name, dependencies, devDependencies} from './package.json'

const rootPath = (nPath) => path.resolve(__dirname, nPath)
const BUILD_PATH = './dist'
const NODE_MODULES = rootPath('node_modules')

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

export default CONFIG
