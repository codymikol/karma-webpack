/* eslint-disable prettier/prettier */

import karmaChromeLauncher from 'karma-chrome-launcher';
import karmaMocha from 'karma-mocha';
import karmaChai from 'karma-chai';

import Scenario from '../../utils/scenario';

const fs = require('fs');

process.env.CHROME_BIN = require('puppeteer').executablePath();

const path = require('path');

const karmaWebpack = require('../../../../lib/index');

// The karma server integration tests take longer than the jest 5 sec default,
// we will give them 30 seconds to complete.
const KARMA_SERVER_TIMEOUT = 30 * 1000;
const KARMA_CUSTOM_PATH = '/tmp/karma_webpack__custom_file_path';

describe('A basic karma-webpack setup', () => {
  let scenario;

  const TEST_PATH = path.resolve(__dirname, './index.scenario.js');

  const config = {
    frameworks: ['mocha', 'chai', 'webpack'],
    files: [{ pattern: TEST_PATH }],
    preprocessors: { [TEST_PATH]: ['webpack'] },
    webpack: {
      devtool: false,
      output: {
        path: KARMA_CUSTOM_PATH,
        filename: 'hi_[id].js',
      }
    },
    browsers: ['ChromeHeadless'],
    // Explicitly turn off reporters so the simulated test results are not confused with the actual results.
    reporters: [],
    plugins: [karmaWebpack, karmaChromeLauncher, karmaMocha, karmaChai],
    port: 2389,
    logLevel: 'ERROR',
    singleRun: true
  };

  beforeAll((done) => {
    jest.spyOn(console, 'warn').mockImplementation()
    jest.spyOn(console, 'log').mockImplementation()
    Scenario.run(config)
      .then((res) => {
        scenario = res;
      })
      .catch((err) => console.error('Integration Scenario Failed: ', err))
      .finally(() => done());
  }, KARMA_SERVER_TIMEOUT);

  it('should have an exit code of 1 because it contains a failing test', () => {
    expect(scenario.exitCode).toBe(1);
  })

  it('should have three successful test runs', () => {
    expect(scenario.success).toBe(3);
  });

  it('should have one failed test run', () => {
    expect(scenario.failed).toBe(1);
  });

  it('should complete with no errors', () => {
    expect(scenario.error).toBe(false);
  });

  it('should create the custom karma_webpack__custom_file_path directory', () => {
    expect(fs.existsSync(KARMA_CUSTOM_PATH)).toBe(true);
  })

  it('should contain the generated commons file', () => {
    expect(fs.existsSync(`${KARMA_CUSTOM_PATH}/commons.js`)).toBe(true)
  })

  it('should contain the generated runtime file', () => {
    expect(fs.existsSync(`${KARMA_CUSTOM_PATH}/runtime.js`)).toBe(true)
  })

});
