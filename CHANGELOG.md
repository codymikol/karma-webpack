# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [5.0.0](https://github.com/webpack-contrib/karma-webpack/compare/v5.0.0-alpha.6...v5.0.0) (2021-02-02)

No changes, just a new stable release.

# [5.0.0-alpha.6](https://github.com/webpack-contrib/karma-webpack/compare/v5.0.0-alpha.5...v5.0.0-alpha.6) (2021-01-30)


### Bug Fixes

* automatically fix missing webpack framework and report a warning ([ea5dc8e](https://github.com/ryanclark/karma-webpack/commit/ea5dc8ec56ac2752f76e1b1858bf1320ff2ee127))
* fix an issue where multiple karma-webpack processes could not run in parallel ([ea3dabe](https://github.com/ryanclark/karma-webpack/commit/ea3dabe7f7cd8910b61d2bc462c40fa2a37d5feb))
* bump hotfix dependencies ([98b3ec9](https://github.com/ryanclark/karma-webpack/commit/98b3ec9c83c336e73465459b7f02d5d1d987ba2c))

# [5.0.0-alpha.5](https://github.com/webpack-contrib/karma-webpack/compare/v5.0.0-alpha.4...v5.0.0-alpha.5) (2020-12-06)


### Bug Fixes

* change the webpack peer dependency to webpack v5 ([2e0ca74](https://github.com/ryanclark/karma-webpack/commit/2e0ca74c75b173abd5af9f2766b62463252a83e5))

# [5.0.0-alpha.4](https://github.com/webpack-contrib/karma-webpack/compare/v5.0.0-alpha.3.0...v5.0.0-alpha.4) (2020-12-06)


### Bug Fixes

* fix compatibility issues for webpack v5 ([8d7366f](https://github.com/ryanclark/karma-webpack/commit/8d7366f3cb747a9493c9f5542b9cb0317ac32d9e)), closes [#452](https://github.com/ryanclark/karma-webpack/issues/452)
* remove deprecation warning for `.watch()` ([4fe1f60](https://github.com/ryanclark/karma-webpack/commit/4fe1f6093fc6ff25503f1422123b2b3944a4145a))

# [5.0.0-alpha.3.0](https://github.com/webpack-contrib/karma-webpack/compare/v5.0.0-alpha.2...v5.0.0-alpha.3.0) (2019-03-07)


### Bug Fixes

* allow for same filenames to be added ([#401](https://github.com/webpack-contrib/karma-webpack/issues/401)) ([80ce2d8](https://github.com/webpack-contrib/karma-webpack/commit/80ce2d8)), closes [#400](https://github.com/webpack-contrib/karma-webpack/issues/400)



<a name="5.0.0-alpha.2"></a>
# [5.0.0-alpha.2](https://github.com/webpack-contrib/karma-webpack/compare/v5.0.0-alpha.1...v5.0.0-alpha.2) (2019-02-13)


### Bug Fixes

* **karma-webpack:**  normalize paths to be compatible with windows ([b783e1c](https://github.com/webpack-contrib/karma-webpack/commit/b783e1c))



<a name="5.0.0-alpha.1"></a>
# [5.0.0-alpha.1](https://github.com/webpack-contrib/karma-webpack/compare/v5.0.0-alpha.0...v5.0.0-alpha.1) (2019-01-01)


### Bug Fixes

* **karma-webpack:** add dynamic imports to main bundle ([#384](https://github.com/webpack-contrib/karma-webpack/issues/384)) ([288a8c2](https://github.com/webpack-contrib/karma-webpack/commit/288a8c2))
* **karma-webpack:** disable karma watch; use webpack watch only ([#386](https://github.com/webpack-contrib/karma-webpack/issues/386)) ([1696bfd](https://github.com/webpack-contrib/karma-webpack/commit/1696bfd))



<a name="5.0.0-alpha.0"></a>
# [5.0.0-alpha.0](https://github.com/webpack-contrib/karma-webpack/compare/v4.0.0-rc.5...v5.0.0-alpha.0) (2018-12-13)


### Features

* **karma-webpack:** Add webpack as framework and use shared bundles ([#380](https://github.com/webpack-contrib/karma-webpack/issues/380)) ([2ab7ad5](https://github.com/webpack-contrib/karma-webpack/commit/2ab7ad5)), closes [#379](https://github.com/webpack-contrib/karma-webpack/issues/379)


### BREAKING CHANGES

* **karma-webpack:** webpack needs to be added to frameworks

```
// old:
frameworks: ['mocha'],

// new:
frameworks: ['mocha', 'webpack'],
```
* **karma-webpack:** old alternative usage is no longer recommended
* **karma-webpack:** webpack-dev-middleware removed
* **karma-webpack:** default webpack configuration changed drastically



<a name="4.0.0-rc.5"></a>
# [4.0.0-rc.5](https://github.com/webpack-contrib/karma-webpack/compare/v4.0.0-rc.4...v4.0.0-rc.5) (2018-11-30)


### Bug Fixes

* **karma-webpack:** Do not unify "colors" property if webpack "stats" is a string ([#376](https://github.com/webpack-contrib/karma-webpack/issues/376)) ([840dea2](https://github.com/webpack-contrib/karma-webpack/commit/840dea2)), closes [#375](https://github.com/webpack-contrib/karma-webpack/issues/375)



<a name="4.0.0-rc.4"></a>
# [4.0.0-rc.4](https://github.com/webpack-contrib/karma-webpack/compare/v4.0.0-rc.3...v4.0.0-rc.4) (2018-11-28)


### Bug Fixes

* **karma-webpack:** Fix publicPath to be Windows-compatible ([#373](https://github.com/webpack-contrib/karma-webpack/issues/373)) ([fca13b9](https://github.com/webpack-contrib/karma-webpack/commit/fca13b9)), closes [#362](https://github.com/webpack-contrib/karma-webpack/issues/362)
* **package:** restore prepare script in package.json so that npm install from github works ([#367](https://github.com/webpack-contrib/karma-webpack/issues/367)) ([3e1f3e4](https://github.com/webpack-contrib/karma-webpack/commit/3e1f3e4))


### Features

* **karma-webpack:** unify webpack and  Karma colour config ([#356](https://github.com/webpack-contrib/karma-webpack/issues/356)) ([9559306](https://github.com/webpack-contrib/karma-webpack/commit/9559306)), closes [#332](https://github.com/webpack-contrib/karma-webpack/issues/332)



<a name="4.0.0-rc.3"></a>
# [4.0.0-rc.3](https://github.com/webpack-contrib/karma-webpack/compare/v4.0.0-rc.2...v4.0.0-rc.3) (2018-11-20)


### Bug Fixes

* **karma-webpack:** handle multiple outputs correctly ([#361](https://github.com/webpack-contrib/karma-webpack/issues/361)) ([41edac8](https://github.com/webpack-contrib/karma-webpack/commit/41edac8))



<a name="4.0.0-rc.2"></a>
# [4.0.0-rc.2](https://github.com/webpack-contrib/karma-webpack/compare/v4.0.0-rc.1...v4.0.0-rc.2) (2018-09-07)


### Bug Fixes

* **karma-webpack:** don't include the `os.tmpdir` (`output.publicPath`) ([#338](https://github.com/webpack-contrib/karma-webpack/issues/338)) ([66f4cd7](https://github.com/webpack-contrib/karma-webpack/commit/66f4cd7))
* **karma-webpack:** normalize paths (`windows`) ([#351](https://github.com/webpack-contrib/karma-webpack/issues/351)) ([2145ec2](https://github.com/webpack-contrib/karma-webpack/commit/2145ec2))
* **package:** 64 vulnerabilities (2 low, 62 moderate) (`audit`) ([9816152](https://github.com/webpack-contrib/karma-webpack/commit/9816152))



<a name="4.0.0-rc.1"></a>
# [4.0.0-rc.1](https://github.com/webpack-contrib/karma-webpack/compare/v4.0.0-rc.0...v4.0.0-rc.1) (2018-09-03)


### Bug Fixes

* **karma-webpack:** correctly map `entries` to outputted `assets` (`config.output`) ([#347](https://github.com/webpack-contrib/karma-webpack/issues/347)) ([ab4dde9](https://github.com/webpack-contrib/karma-webpack/commit/ab4dde9))



<a name="4.0.0-rc.0"></a>
# [4.0.0-rc.0](https://github.com/webpack-contrib/karma-webpack/compare/v3.0.0...v4.0.0-rc.0) (2018-09-01)


### Bug Fixes

* **karma-webpack:** `compilation` hangs when adding a file ([#345](https://github.com/webpack-contrib/karma-webpack/issues/345)) ([ddf161d](https://github.com/webpack-contrib/karma-webpack/commit/ddf161d))
* **karma-webpack:** allow `filename` and `chunkFilename` to be overridden (`config.output`) ([#336](https://github.com/webpack-contrib/karma-webpack/issues/336)) ([c256d87](https://github.com/webpack-contrib/karma-webpack/commit/c256d87))
* **karma-webpack:** disable `optimization` by default (`webpack >= v4.0.0`) ([#325](https://github.com/webpack-contrib/karma-webpack/issues/325)) ([51bdcaa](https://github.com/webpack-contrib/karma-webpack/commit/51bdcaa))
* **mocha-env-loader:** add `webpack >= v4.0.0` support ([#341](https://github.com/webpack-contrib/karma-webpack/issues/341)) ([39ff49c](https://github.com/webpack-contrib/karma-webpack/commit/39ff49c))


### Chores

* **package:** update `webpack-dev-middleware` v2.0.6...3.0.1 (`dependencies`) ([1741bca](https://github.com/webpack-contrib/karma-webpack/commit/1741bca))


### Code Refactoring

* **karma-webpack:** upgrade plugin system (`tapable`) ([f275d40](https://github.com/webpack-contrib/karma-webpack/commit/f275d40))


### BREAKING CHANGES

* **package:** requires `webpack >= v4.0.0`
* **karma-webpack:** requires `webpack >= v4.0.0`



<a name="4.0.0-beta.0"></a>
# [4.0.0-beta.0](https://github.com/webpack-contrib/karma-webpack/compare/v3.0.0...v4.0.0-beta.0) (2018-03-19)


### Chores

* **package:** update `webpack-dev-middleware` v2.0.6...3.0.1 (`dependencies`) ([ffa0a9c](https://github.com/webpack-contrib/karma-webpack/commit/ffa0a9c))


### Code Refactoring

* **karma-webpack:** upgrade plugin system (`tapable`) ([395eab4](https://github.com/webpack-contrib/karma-webpack/commit/395eab4))


### BREAKING CHANGES

* **package:** requires `webpack >= v4.0.0`
* **karma-webpack:** requires `webpack >= v4.0.0`



<a name="3.0.0"></a>
# [3.0.0](https://github.com/webpack-contrib/karma-webpack/compare/v2.0.13...v3.0.0) (2018-03-19)


### Chores

* **package:** update `webpack-dev-middleware` v1.12.0...2.0.6 (`dependencies`) ([#318](https://github.com/webpack-contrib/karma-webpack/issues/318)) ([0c78eaf](https://github.com/webpack-contrib/karma-webpack/commit/0c78eaf))


### BREAKING CHANGES

* **package:** requires `webpack >= v2.0.0`
* **package:** requires `node >= 6.9.0`



<a name="2.0.13"></a>
## [2.0.13](https://github.com/webpack-contrib/karma-webpack/compare/v2.0.12...v2.0.13) (2018-02-27)


### Bug Fixes

* **package:** use `babel-runtime` is a `dependency` (`dependencies`) ([#312](https://github.com/webpack-contrib/karma-webpack/issues/312)) ([c45cdf3](https://github.com/webpack-contrib/karma-webpack/commit/c45cdf3))



<a name="2.0.12"></a>
## [2.0.12](https://github.com/webpack-contrib/karma-webpack/compare/v2.0.11...v2.0.12) (2018-02-26)


### Bug Fixes

* **package:** add `babel-runtime` (`devDependencies`) ([#310](https://github.com/webpack-contrib/karma-webpack/issues/310)) ([6d5fa1c](https://github.com/webpack-contrib/karma-webpack/commit/6d5fa1c))
* **package:** downgrade `source-map` v0.7.0...0.5.6 ([#309](https://github.com/webpack-contrib/karma-webpack/issues/309)) ([070e04e](https://github.com/webpack-contrib/karma-webpack/commit/070e04e))



<a name="2.0.11"></a>
## [2.0.11](https://github.com/webpack-contrib/karma-webpack/compare/v2.0.10...v2.0.11) (2018-02-25)


### Bug Fixes

* **package:** add `main` field ([#306](https://github.com/webpack-contrib/karma-webpack/issues/306)) ([4f5ba3b](https://github.com/webpack-contrib/karma-webpack/commit/4f5ba3b))
* **package:** repository URL typo ([#304](https://github.com/webpack-contrib/karma-webpack/issues/304)) ([2338510](https://github.com/webpack-contrib/karma-webpack/commit/2338510))



<a name="2.0.10"></a>
## [2.0.10](https://github.com/webpac-contrib/karma-webpack/compare/v2.0.9...v2.0.10) (2018-02-25)


### Bug Fixes

* **karma-webpack:** correctly coalesce `idx` (`{Number}`) in filepaths ([#287](https://github.com/webpac-contrib/karma-webpack/issues/287)) ([5fa2409](https://github.com/webpac-contrib/karma-webpack/commit/5fa2409))
* correctly escape `{Regex}` in custom file handler ([#293](https://github.com/webpac-contrib/karma-webpack/issues/293)) ([906ed52](https://github.com/webpac-contrib/karma-webpack/commit/906ed52))
* disable `webpack` rebuilds on karma `--single-run` ([41d1912](https://github.com/webpac-contrib/karma-webpack/commit/41d1912))
* **package:** add `webpack >= v4.0.0` (`peerDependencies`) ([#301](https://github.com/webpac-contrib/karma-webpack/issues/301)) ([99ddad8](https://github.com/webpac-contrib/karma-webpack/commit/99ddad8))



<a name="2.0.9"></a>
## [2.0.9](https://github.com/webpack/karma-webpack/compare/v2.0.8...v2.0.9) (2017-12-14)


### Bug Fixes

* ensure webpack paths include a trailing slash ([#285](https://github.com/webpack/karma-webpack/issues/285)) ([be2b0e8](https://github.com/webpack/karma-webpack/commit/be2b0e8)), closes [#284](https://github.com/webpack/karma-webpack/issues/284)



<a name="2.0.8"></a>
## [2.0.8](https://github.com/webpack/karma-webpack/compare/v2.0.7...v2.0.8) (2017-12-14)


### Bug Fixes

* use `os.tmpdir()` to safely store `_karma_webpack_` ([#279](https://github.com/webpack/karma-webpack/issues/279)) ([0616dda](https://github.com/webpack/karma-webpack/commit/0616dda))



<a name="2.0.7"></a>
## [2.0.7](https://github.com/webpack/karma-webpack/compare/v2.0.6...v2.0.7) (2017-12-14)


`DEPRECATED due to publishing issue`



<a name="2.0.6"></a>
## [2.0.6](https://github.com/webpack/karma-webpack/compare/v2.0.5...v2.0.6) (2017-11-10)


### Bug Fixes

* work with sourcemaps when mocha is wrapped ([#237](https://github.com/webpack/karma-webpack/issues/237)) ([#238](https://github.com/webpack/karma-webpack/issues/238)) ([c952bcd](https://github.com/webpack/karma-webpack/commit/c952bcd))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/webpack/karma-webpack/compare/v2.0.4...v2.0.5) (2017-10-08)


### Bug Fixes

* pass on error to callback for better error messages ([#262](https://github.com/webpack/karma-webpack/issues/262)) ([466581f](https://github.com/webpack/karma-webpack/commit/466581f))
* use `file.originalPath` instead of `file.path` ([#218](https://github.com/webpack/karma-webpack/issues/218)) ([0d075b0](https://github.com/webpack/karma-webpack/commit/0d075b0))



<a name="2.0.4"></a>
## [2.0.4](https://github.com/webpack/karma-webpack/compare/v2.0.3...v2.0.4) (2017-07-07)



<a name="2.0.3"></a>
## [2.0.3](https://github.com/webpack/karma-webpack/compare/v2.0.1...v2.0.3) (2017-03-15)


### Bug Fixes

* **readFile:** handle path doesn't exist error ([#208](https://github.com/webpack/karma-webpack/issues/208)) ([907ed72](https://github.com/webpack/karma-webpack/commit/907ed72))
* don't swallow configuration errors ([#232](https://github.com/webpack/karma-webpack/issues/232)) ([4216f13](https://github.com/webpack/karma-webpack/commit/4216f13))
* readFile on windows ([#226](https://github.com/webpack/karma-webpack/issues/226)) ([cad9f8b](https://github.com/webpack/karma-webpack/commit/cad9f8b))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/webpack/karma-webpack/compare/v2.0.1...v2.0.2) (2017-01-19)


### Bug Fixes

* **readFile:** handle path doesn't exist error ([#208](https://github.com/webpack/karma-webpack/issues/208)) ([907ed72](https://github.com/webpack/karma-webpack/commit/907ed72))



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
