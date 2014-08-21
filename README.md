# karma-webpack

``` javascript
// Karma configuration

module.exports = function(config) {
	config.set({
		// ... normal karma configuration

		// add webpack as preprocessor
		preprocessors: {
			'test/*Test.js': ['webpack']
		},

		webpack: {
			cache: true,
			// webpack configuration
		},

		webpackServer: {
			// webpack-dev-server configuration
			// webpack-dev-middleware configuration
		},

		// the port used by the webpack-dev-server
		// defaults to "config.port" + 1
		webpackPort: 1234,

		plugins: [
			require("karma-webpack")
		]

	});
};
```

Every test file is compiled with webpack and the resulting bundle is served.

## contribute

	npm install -g karma webpack webpack-dev-server

Always be testing!

	npm test || karma start ./example/karma.conf.js




## License

Copyright 2014 Tobias Koppers

[MIT](http://www.opensource.org/licenses/mit-license.php)
