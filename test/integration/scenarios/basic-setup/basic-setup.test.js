/* eslint-disable prettier/prettier */
import karmaChromeLauncher from 'karma-chrome-launcher';
import karmaMocha from 'karma-mocha';
import karmaChai from 'karma-chai';

import ScenarioUtils from '../../utils/ScenarioUtils';

const path = require('path');

const karmaWebpack = require('../../../../lib/index');

// The karma server integration tests take longer than the jest 5 sec default,
// we will give them 30 seconds to complete.
const KARMA_SERVER_TIMEOUT = 30 * 1000;

describe('A basic karma-webpack setup', () => {
  let scenario;

  const TEST_PATH = path.resolve(__dirname, './index.scenario.js');

  const config = {
    frameworks: ['webpack', 'mocha', 'chai'],
    files: [{ pattern: TEST_PATH }],
    preprocessors: { [TEST_PATH]: ['webpack'] },
    webpack: {},
    browsers: ['ChromeHeadless'],
    // Explicitly turn off reporters so the simulated test results are not confused with the actual results.
    reporters: [],
    plugins: [karmaWebpack, karmaChromeLauncher, karmaMocha, karmaChai],
    port: 2389,
    logLevel: 'ERROR',
    singleRun: true,
  };

  beforeAll((done) => {
    ScenarioUtils.run(config)
      .then((res) => {
        scenario = res;
        done();
      })
      .catch((err) => {
        jest.fail('Karma run has failed with an error', err);
        done();
      });
  }, KARMA_SERVER_TIMEOUT);

  it('should have three successful test runs', () => {
    expect(scenario.success).toBe(3);
  });

  it('should have one failed test run', () => {
    expect(scenario.failed).toBe(1);
  });

  it('should complete with no errors', () => {
    expect(scenario.error).toBe(false);
  });

});
