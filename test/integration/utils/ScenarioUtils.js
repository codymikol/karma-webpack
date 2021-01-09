const { fork } = require('child_process');
const path = require('path');

// eslint-disable-next-line no-unused-vars
const karma = require('karma');

const ScenarioUtils = { run };

/**
 * This allows you to run a karma with a given configuration and list of plugins,
 * on completion you will be returned a karma results object.
 *
 * @param {karma.ConfigOptions} config - The base karma configuration.
 * @param {Array<String>} plugins - A list of plugins to be required
 * @returns {Promise<karma.TestResults>}
 */
function run(config, plugins) {
  return new Promise((resolve, reject) => {
    fork(path.resolve(`${__dirname}/KarmaWorker.js`))
      .on('close', reject)
      .on('error', reject)
      .on('message', resolve)
      .send({ config, plugins });
  });
}

export default ScenarioUtils;
