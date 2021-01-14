/* eslint-disable no-console */
const karma = require('karma');

const ScenarioUtils = { run };

/**
 * This allows you to run karma with a given configuration and be returned.
 * either the results of the run, or an error.
 * @param {karma.ConfigOptions} config - The base karma configuration.
 * @returns {Promise<karma.TestResults>}
 */
function run(config) {
  return new Promise((resolve, reject) => {
    const server = new karma.Server(config, (exitCode) => {
      // todo(mikol): handle karma specific error codes...
      if (exitCode !== 0) {
        reject(new Error(`Karma failed with exit code: ${exitCode}`));
      }
    });

    server.on('browser_register', (browser) =>
      console.log(`Karma registered browser: ${browser.name}`)
    );

    server.on('browser_error', (browser, error) =>
      console.error(
        `Karma encountered and error in browser: ${browser.name} - ${error}`
      )
    );

    server.on('browser_start', (browser) =>
      console.log(`Karma started browser: ${browser.name}`)
    );

    server.on(
      'browser_complete',
      (browser) => `Karma browser: ${browser.name} completed`
    );

    server.on('browsers_ready', () => {
      console.log('Karma reports all browsers are ready');
    });

    server.on('run_complete', (browsers, results) => resolve(results));

    server.start();
  });
}

export default ScenarioUtils;
