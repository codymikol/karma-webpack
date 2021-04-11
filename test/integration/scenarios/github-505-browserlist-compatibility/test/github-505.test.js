/* eslint-disable prettier/prettier */

import karmaChromeLauncher from 'karma-chrome-launcher';
import karmaMocha from 'karma-mocha';

import Scenario from '../../../utils/scenario';
import {KARMA_SERVER_TIMEOUT} from "../../config/defaults";

process.env.CHROME_BIN = require('puppeteer').executablePath();

const path = require('path');

const karmaWebpack = require('../../../../../lib');

// The karma server integration tests take longer than the jest 5 sec default,
// we will give them 30 seconds to complete.

describe('A basic karma-webpack setup', () => {

  let scenario;

  const config = {
    basePath: path.resolve(__dirname, '../'),
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'webpack'],
    files: [{pattern: 'test/karma.tests.js', watched: false}],
    plugins: [karmaMocha, karmaChromeLauncher, karmaWebpack],
    preprocessors: {'test/karma.tests.js': ['webpack'],},
    webpack: {},
  };

  beforeAll((done) => {
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

  it('should have one successful test run', () => {
    expect(scenario.success).toBe(1);
  });

  it('should have one failed test run', () => {
    expect(scenario.failed).toBe(1);
  });

  it('should complete with no errors', () => {
    expect(scenario.error).toBe(false);
  });

});
