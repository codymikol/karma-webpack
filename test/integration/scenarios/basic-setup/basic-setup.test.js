import ScenarioUtils from '../../utils/ScenarioUtils';

const path = require('path');

describe('A basic karma-webpack setup', () => {
  let scenario;

  const TEST_PATH = path.resolve(__dirname, './index.scenario.js');

  const config = {
    frameworks: ['webpack', 'mocha'],
    files: [{ pattern: TEST_PATH }],
    preprocessors: { [TEST_PATH]: ['webpack'] },
    webpack: {},
    browsers: ['ChromeHeadless'],
    // Explicitly turn off reporters so the simulated test results are not confused with the actual results.
    reporters: [],
    port: 2389,
    logLevel: 'OFF',
    singleRun: true,
  };

  const plugins = ['karma-webpack', 'karma-chrome-launcher', 'karma-mocha'];

  beforeAll((done) => {
    ScenarioUtils.run(config, plugins)
      .then((res) => {
        scenario = res;
        done();
      })
      .catch((err) => {
        jest.fail('Karma run has failed with an error', err);
      });
  });

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
