[![npm][npm]][npm-url]
[![node][node]][node-url]
[![coverage][cover]][cover-url]

<div align="center">
  <a href='https://github.com/karma-runner/karma'>
    <img width="180" height="180"
      src="https://worldvectorlogo.com/logos/karma.svg">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>Karma Webpack</h1>
  <p>Use webpack to preprocess files in karma<p>
</div>

<h2 align="center">Install</h2>

npm `npm i -D karma-webpack`

yarn `yarn add -D karma-webpack`

<h2 align="center">Usage</h2>

**karma.conf.js**
```js
module.exports = (config) => {
  config.set({
    // ... normal karma configuration

    // make sure to include webpack as a framework
    frameworks: ['mocha', 'webpack'],
    
    plugins: [
      'karma-webpack',
      'karma-mocha',
    ],

    files: [
      // all files ending in ".test.js"
      // !!! use watched: false as we use webpacks watch
      { pattern: 'test/**/*.test.js', watched: false }
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/**/*.test.js': [ 'webpack' ]
    },

    webpack: {
      // karma watches the test entry points
      // Do NOT specify the entry option
      // webpack watches dependencies

      // webpack configuration
    },
  });
}
```

### Default webpack configuration

This configuration will be merged with what gets provided via karma's config.webpack.

```js
const defaultWebpackOptions = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.join(os.tmpdir(), '_karma_webpack_') + Math.floor(Math.random() * 1000000),
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
          chunks: 'initial',
          minChunks: 1,
        },
      },
    },
  },
  plugins: [],
};
```

### How it works

This project is a framework and preprocessor for Karma that combines test files and dependencies into 2 shared bundles and 1 chunk per test file. It relies on webpack to generate the bundles/chunks and to keep it updated during `autoWatch=true`.

The first preproccessor triggers the build of all the bundles/chunks and all following files just return the output of this one build process.

### Webpack typescript support

By default karma-webpack forces *.js files so if you test *.ts files and use webpack to build typescript to javascript it works out of the box.

If you have a different need you can override by settig `webpack.transformPath`

```js
// this is the by default applied transformPath
webpack: {
  transformPath: (filepath) => {
      // force *.js files by default
      const info = path.parse(filepath);
      return `${path.join(info.dir, info.name)}.js`;
    },
},
```

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
  devtool: 'inline-source-map'
}
```

<h2 align="center">Current Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td>
        <img width="150" height="150"
             src="https://avatars.githubusercontent.com/u/13606342?s=460&u=467cf9a106d2bb474cf627ffd4e0eac80d0b4705&v=4">
        <br>
        <a href="http://codymikol.com">Cody Mikol</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Previous Maintainers</h2>

Previous maintainers of the `karma-webpack` plugin that have done such amazing work to get it to where it is today.

<table class="maintainers">
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars0.githubusercontent.com/u/7922109?v=4&s=150">
        <br>
        <a href="https://github.com/ryanclark">Ryan Clark</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/2045543?v=4&s=150">
        <br>
        <a href="https://github.com/AprilArcus">April Arcus</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/4650931?v=3&s=150">
        </br>
        <a href="https://github.com/MikaAK">Mika Kalathil</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/8420490?v=3&s=150">
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://avatars.githubusercontent.com/u/1919664?v=3&s=150">
        <a href="https://github.com/goldhand">Will Farley</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/1307954?v=3&s=150">
        <a href="https://github.com/DanielaValero">Daniela Valero</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/122108?v=3&s=150">
        <a href="https://github.com/jon301">Jonathan Trang</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/3285723?v=3&s=150">
        <a href="https://github.com/carlos-">Carlos Morales</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/karma-webpack.svg
[npm-url]: https://npmjs.com/package/karma-webpack

[node]: https://img.shields.io/node/v/karma-webpack.svg
[node-url]: https://nodejs.org

[cover]: https://codecov.io/gh/webpack-contrib/karma-webpack/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/karma-webpack
