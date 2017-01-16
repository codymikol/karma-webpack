<a name="2.0.1"></a>
## [2.0.1](https://github.com/webpack/karma-webpack/compare/v2.0.0...v2.0.1) (2017-01-11)

### Chores

 * **release:** patch version for release issue. No code changes.


<a name="2.0.0"></a>
## [2.0.0](https://github.com/webpack/karma-webpack/compare/v1.8.1...v2.0.0) (2017-01-11)

### Chores

* **package:** update webpack peerDependencies. ([9fd5fdf](https://github.com/webpack/karma-webpack/commit/9fd5fdf))


### Bug Fixes

* **config:** webpack rc4 schema enforcment (fixes [#193](https://github.com/webpack/karma-webpack/issues/193)) ([e6a3cb7](https://github.com/webpack/karma-webpack/commit/e6a3cb7))


### BREAKING CHANGES

* config: Remove entry:{} from test configurations

When updating to `"webpack": "2.2.0-rc.4"` & `"karma-webpack": "1.8.2"` you have to pull the `entry` property if it's set to an empty object so it defaults to a function within karma-webpack


<a name="1.8.1"></a>
## [1.8.1](https://github.com/webpack/karma-webpack/compare/v1.8.0...v1.8.1) (2016-12-27)

### Bug Fixes

* **build:** Removes dist from scm ([#158](https://github.com/webpack/karma-webpack/issues/158)) ([68ff1d5](https://github.com/webpack/karma-webpack/commit/68ff1d5))


<a name="1.8.0"></a>
## [1.8.0](https://github.com/webpack/karma-webpack/compare/v1.7.0...v1.8.0) (2016-08-07)

### Bug Fixes

* **build:** Removes dist from scm ([#158](https://github.com/webpack/karma-webpack/issues/158)) ([9ea6921](https://github.com/webpack/karma-webpack/commit/9ea6921))
* **config:** webpack rc4 schema enforcment (fixes [#193](https://github.com/webpack/karma-webpack/issues/193)) ([e6a3cb7](https://github.com/webpack/karma-webpack/commit/e6a3cb7))
* **provider:** no provider for variable name Fix [#146](https://github.com/webpack/karma-webpack/issues/146) ([43f18d3](https://github.com/webpack/karma-webpack/commit/43f18d3))


### Features

* **webpack:** add support for webpack2.1.0-beta ([bdd8c80](https://github.com/webpack/karma-webpack/commit/bdd8c80))
* **webpack:** add webpack blocker ([03f6495](https://github.com/webpack/karma-webpack/commit/03f6495))
* **karma:** karma execution blocker ([d776068](https://github.com/webpack/karma-webpack/commit/d776068))
* **webpack:** support chunks without errors ([7334dbc](https://github.com/webpack/karma-webpack/commit/7334dbc))
