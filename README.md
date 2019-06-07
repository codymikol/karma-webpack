<div align="center">
  <a href='https://github.com/karma-runner/karma'>
    <img width="180" height="180"
      src="https://worldvectorlogo.com/logos/karma.svg">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# karma-webpack

Use webpack to preprocess files in karma.

## Getting Started

To begin, you'll need to install `karma-webpack`:

```console
npm i --save-dev karma-webpack
```

Then add config:

**karma.conf.js**

```js
module.exports = (config) => {
  config.set({
    // ... normal karma configuration
    files: [
      // all files ending in "_test"
      { pattern: 'test/*_test.js', watched: false },
      { pattern: 'test/**/*_test.js', watched: false },
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/*_test.js': ['webpack'],
      'test/**/*_test.js': ['webpack'],
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },
  });
};
```

### `Alternative Usage`

This configuration is more performant, but you cannot run single test anymore (only the complete suite).

The above configuration generates a `webpack` bundle for each test. For many test cases this can result in many big files. The alternative configuration creates a single bundle with all test cases.

**karma.conf.js**

```js
files: [
  // only specify one entry point
  // and require all tests in there
  'test/index_test.js'
],

preprocessors: {
  // add webpack as preprocessor
  'test/index_test.js': [ 'webpack' ]
},
```

**test/index_test.js**

```js
// require all modules ending in "_test" from the
// current directory and all subdirectories
const testsContext = require.context('.', true, /_test$/);

testsContext.keys().forEach(testsContext);
```

Every test file is required using the [require.context](https://webpack.js.org/guides/dependency-management/#require-context) and compiled with webpack into one test bundle.

### `Source Maps`

You can use the `karma-sourcemap-loader` to get the source maps generated for your test bundle.

```bash
npm i -D karma-sourcemap-loader
```

And then add it to your preprocessors.

**karma.conf.js**

```js
preprocessors: {
  'test/test_index.js': [ 'webpack', 'sourcemap' ]
}
```

And tell `webpack` to generate sourcemaps.

**webpack.config.js**

```js
webpack: {
  // ...
  devtool: 'inline-source-map';
}
```

## Options

This is the full list of options you can specify in your `karma.conf.js`

|                     Name                      |    Type    | Default | Description                                                                             |
| :-------------------------------------------: | :--------: | :-----: | :-------------------------------------------------------------------------------------- |
|           [**`webpack`**](#webpack)           | `{Object}` |  `{}`   | Pass `webpack.config.js` to `karma`                                                     |
| [**`webpackMiddleware`**](#webpackmiddleware) | `{Object}` |  `{}`   | Pass `webpack-dev-middleware` configuration to `karma`                                  |
|  [**`beforeMiddleware`**](#beforemiddleware)  | `{Object}` |  `{}`   | Pass custom middleware configuration to `karma`, **before** any `karma` middleware runs |

### `webpack`

`webpack` configuration (`webpack.config.js`).

### `webpackMiddleware`

Configuration for `webpack-dev-middleware`.

### `beforeMiddleware`

`beforeMiddleware` is a `webpack` option that allows injecting middleware before
karma's own middleware runs. This loader provides a `webpackBlocker`
middleware that will block tests from running until code recompiles. That is,
given this scenario

1. Have a browser open on the karma debug page (http://localhost:9876/debug.html)
2. Make a code change
3. Refresh

Without the `webpackBlocker` middleware karma will serve files from before
the code change. With the `webpackBlocker` middleware the loader will not serve
the files until the code has finished recompiling.

> **⚠️ The `beforeMiddleware` option is only supported in `karma >= v1.0.0`**

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/karma-webpack.svg
[npm-url]: https://npmjs.com/package/karma-webpack
[node]: https://img.shields.io/node/v/karma-webpack.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/karma-webpack.svg
[deps-url]: https://david-dm.org/webpack-contrib/karma-webpack
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[tests]: https://dev.azure.com/webpack-contrib/karma-webpack/_apis/build/status/webpack-contrib.karma-webpack?branchName=master
[tests-url]: https://dev.azure.com/webpack-contrib/karma-webpack/_build/latest?definitionId=2&branchName=master
[cover]: https://codecov.io/gh/webpack-contrib/karma-webpack/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/karma-webpack
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=css-loader
[size-url]: https://packagephobia.now.sh/result?p=css-loader
