const karma = require('karma');

const Scenario = { run };

/**
 * This allows you to run karma with a given configuration and be returned.
 * either the results of the run, or an error.
 * @param {karma.ConfigOptions} config - The base karma configuration.
 * @returns {Promise<karma.TestResults>}
 */
function run(config) {
  return new Promise((resolve, reject) => {
    const server = new karma.Server(config, (exitCode) => {
      if (exitCode !== 0) {
        reject(new Error(`Karma failed with exit code: ${exitCode}`));
      }
    });
    server.on('run_complete', (browsers, results) => resolve(results));
    server.start();
  });
}

export default Scenario;
