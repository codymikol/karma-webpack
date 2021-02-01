const { ensureWebpackFrameworkSet } = require('../../../lib/karma/validation');

describe('karmaConfigValidation', () => {
  describe('ensureWebpackFrameworkExists', () => {
    let config;
    beforeEach(() => (config = { frameworks: [] }));

    it('should add webpack to the list of karma config frameworks if it did not already exist', () => {
      ensureWebpackFrameworkSet(config);
      expect(config.frameworks.length).toBe(1);
      expect(config.frameworks[0]).toBe('webpack');
    });

    it('should add webpack to an existing list of frameworks', () => {
      config.frameworks = ['foo', 'bar'];
      ensureWebpackFrameworkSet(config);
      expect(config.frameworks.length).toBe(3);
      expect(config.frameworks).toContain('webpack');
    });
    it('should create a frameworks array if one does not exist', () => {
      delete config.frameworks;
      ensureWebpackFrameworkSet(config);
      expect(config.frameworks.length).toBe(1);
      expect(config.frameworks[0]).toBe('webpack');
    });
  });
});
