function ensureWebpackFrameworkSet(karmaConfig) {
  if (!Array.isArray(karmaConfig.frameworks)) {
    karmaConfig.frameworks = [];
  }
  if (karmaConfig.frameworks.indexOf('webpack') === -1) {
    console.warn(
      'webpack was not included as a framework in karma configuration, setting this automatically...'
    );
    karmaConfig.frameworks.push('webpack');
  }
}

module.exports = { ensureWebpackFrameworkSet };
