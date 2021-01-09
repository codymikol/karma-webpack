process.env.CHROME_BIN = require('puppeteer').executablePath();
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaMocha = require('karma-mocha');
const { Server } = require('karma');

const karmaWebpack = require('../../../lib/index');

const PLUGINS = {
  'karma-webpack': karmaWebpack,
  'karma-mocha': karmaMocha,
  'karma-chrome-launcher': karmaChromeLauncher,
};

function getPlugin(plugin) {
  if (PLUGINS[plugin]) return PLUGINS[plugin];
  throw new Error(
    `Tried to load an unknown plugin [${plugin}] while running a karma scenario.`
  );
}

process.on('message', ({ config, plugins }) => {
  if (config.plugins) {
    throw new Error(`
Error: please specify plugins as the second argument of ScenarioUtils.run. \n
available plugins: [${Object.keys(PLUGINS).join(',')}]}
`);
  }

  const karmaConfiguration = config;
  karmaConfiguration.plugins = plugins.map(getPlugin);
  const server = new Server(karmaConfiguration);
  // This will run once when the karma server completes running tests.
  server.on('run_complete', (browsers, results) => process.send(results));
  server.start();
});
