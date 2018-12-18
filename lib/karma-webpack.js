const path = require('path');
const fs = require('fs');

const glob = require('glob');
const minimatch = require('minimatch');

const { KarmaWebpackController } = require('./KarmaWebpackController');

const controller = new KarmaWebpackController();

/**
 * @param {any} config
 * @param {KarmaWebpackController} _controller
 */
function registerExtraWebpackFiles(config, _controller) {
  const localController = _controller || controller;
  const commonsPath = path.join(localController.outputPath, 'commons.js');
  const runtimePath = path.join(localController.outputPath, 'runtime.js');

  // make sure tmp folder exists
  if (!fs.existsSync(localController.outputPath)) {
    fs.mkdirSync(localController.outputPath);
  }

  // create dummy files for commons.js and runtime.js so they get included by karma
  fs.closeSync(fs.openSync(commonsPath, 'w'));
  fs.closeSync(fs.openSync(runtimePath, 'w'));

  // register for karma
  config.files.unshift({
    pattern: commonsPath,
    included: true,
    served: true,
    watched: false,
  });
  config.files.unshift({
    pattern: runtimePath,
    included: true,
    served: true,
    watched: false,
  });
}

/**
 * @param {any} config
 */
function configToWebpackEntries(config) {
  /** @type {Array<any>} */
  const filteredPreprocessorsPatterns = [];
  const { preprocessors } = config;

  /** @type {Array<any>} */
  let files = [];
  config.files.forEach((/** @type {any} fileEntry */ fileEntry) => {
    files = [...files, ...glob.sync(fileEntry.pattern)];
  });

  Object.keys(preprocessors).forEach((pattern) => {
    if (preprocessors[pattern].includes('webpack')) {
      filteredPreprocessorsPatterns.push(pattern);
    }
  });

  /** @type {Array<any>} */
  const filteredFiles = [];
  files.forEach((filePath) => {
    filteredPreprocessorsPatterns.forEach((pattern) => {
      if (minimatch(filePath, pattern)) {
        filteredFiles.push(filePath);
      }
    });
  });

  /** @type {any} */
  const webpackEntries = {};
  filteredFiles.forEach((filePath) => {
    webpackEntries[path.parse(filePath).name] = filePath;
  });

  return webpackEntries;
}

/**
 * @param {string} filepath
 */
const defaultTransformPath = (filepath) => {
  // force *.js files by default
  const info = path.parse(filepath);
  return `${path.join(info.dir, info.name)}.js`;
};

/**
 * @param {any} config
 * @param {import('karma').Server} emitter
 */
function preprocessorFactory(config, emitter) {
  // one time setup
  if (controller.isActive === false) {
    controller.updateWebpackOptions({
      entry: configToWebpackEntries(config),
      watch: config.autoWatch,
    });
    controller.updateWebpackOptions(config.webpack);
    controller.karmaEmitter = emitter;
  }

  const transformPath = config.webpack.transformPath || defaultTransformPath;

  /**
   * @param {string} content
   * @param {{ path: string }} file
   * @param {function} done
   * @returns {Promise<any>}
   */
  const processFile = async (content, file, done) => {
    await controller.bundle();

    file.path = transformPath(file.path); // eslint-disable-line no-param-reassign

    const bundleContent = controller.bundlesContent[path.parse(file.path).base];
    done(null, bundleContent);
  };

  return processFile;
}

registerExtraWebpackFiles.$inject = ['config'];
preprocessorFactory.$inject = ['config', 'emitter'];

module.exports = {
  'preprocessor:webpack': ['factory', preprocessorFactory],
  'framework:webpack': ['factory', registerExtraWebpackFiles],
  registerExtraWebpackFiles,
  configToWebpackEntries,
};
