# karma-webpack

## Installation

``` sh
npm install --save-dev karma-webpack
```

## Usage

``` javascript
// Karma configuration

module.exports = function(config) {
	config.set({
		
		files: [
			// only specify one entry point
			// and require all tests in there
			'test/test_index.js'
		],

		// add webpack as preprocessor
		preprocessors: {
			'test/test_index.js': ['webpack']
		},

		webpack: {
			// karma watches test/test_index.js
			// webpack watches dependencies of test/test_index.js
			watch: true
		},

		webpackServer: {
			noInfo: true
		}

	});
};
```

``` javascript
// test/test_index.js

// require all modules ending in _test from the
// current directory and all subdirectories
var testsContext = require.context(".", true, /_test$/);
testsContext.keys().forEach(testsContext);
```

Every test file is required using the [require.context](http://webpack.github.io/docs/context.html#require-context) and compiled with webpack into one test bundle.

## Source Maps

You can use the `karma-sourcemap-loader` to get the source maps generated for your test bundle.

```
npm install --save-dev karma-sourcemap-loader
```

And then add it to your preprocessors

``` javascript
preprocessors: {
	'test/test_index.js': ['webpack', 'sourcemap']
}
```

And tell webpack to generate sourcemaps

``` javascript
webpack: {
  // ...
	devtool: 'inline-source-map'
}
```

## Options

This is the full list of options you can specify in your Karma config.

### webpack

Webpack configuration.

### webpackServer

Configuration for webpack-dev-server and webpack-dev-middleware.

### webpackPort

Port used by the webpack-dev-server. Defaults to "karmaConfig.port" + 1.

## License

Copyright 2014 Tobias Koppers

[MIT](http://www.opensource.org/licenses/mit-license.php)
