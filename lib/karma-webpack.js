const path = require('path');
const fs = require('fs');

const glob = require('glob');
const minimatch = require('minimatch');

const { KarmaWebpackController } = require('./KarmaWebpackController');

const controller = new KarmaWebpackController();

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
 * Simple hash function by bryc
 * https://gist.github.com/iperelivskiy/4110988#gistcomment-2697447
 */
function hash(s) {
  let h = 0xdeadbeef;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 2654435761); // eslint-disable-line no-bitwise
  }
  return (h ^ (h >>> 16)) >>> 0; // eslint-disable-line no-bitwise
}

function getPathKey(filePath, withExtension = false) {
  const pathParts = path.parse(filePath);
  const key = `${pathParts.name}.${hash(filePath)}`;
  return withExtension ? `${key}${pathParts.ext}` : key;
}

function configToWebpackEntries(config) {
  const filteredPreprocessorsPatterns = [];
  const { preprocessors } = config;

  let files = [];
  config.files.forEach((fileEntry, i) => {
    // forcefully disable karma watch as we use webpack watch only
    config.files[i].watched = false;
    files = [...files, ...glob.sync(fileEntry.pattern)];
  });

  Object.keys(preprocessors).forEach((pattern) => {
    if (preprocessors[pattern].includes('webpack')) {
      filteredPreprocessorsPatterns.push(pattern);
    }
  });

  const filteredFiles = [];
  files.forEach((filePath) => {
    filteredPreprocessorsPatterns.forEach((pattern) => {
      if (minimatch(filePath, pattern)) {
        filteredFiles.push(filePath);
      }
    });
  });

  const webpackEntries = {};
  filteredFiles.forEach((filePath) => {
    webpackEntries[getPathKey(filePath)] = filePath;
  });

  return webpackEntries;
}

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

  const normalize = (file) => file.replace(/\\/g, '/');

  const transformPath =
    config.webpack.transformPath ||
    ((filepath) => {
      // force *.js files by default
      const info = path.parse(filepath);
      return `${path.join(info.dir, info.name)}.js`;
    });

  return async function processFile(content, file, done) {
    await controller.bundle();

    file.path = normalize(transformPath(file.path)); // eslint-disable-line no-param-reassign

    const bundleContent =
      controller.bundlesContent[getPathKey(file.path, true)];
    done(null, bundleContent);
  };
}

registerExtraWebpackFiles.$inject = ['config'];
preprocessorFactory.$inject = ['config', 'emitter'];

module.exports = {
  'preprocessor:webpack': ['factory', preprocessorFactory],
  'framework:webpack': ['factory', registerExtraWebpackFiles],
  registerExtraWebpackFiles,
  configToWebpackEntries,
};
