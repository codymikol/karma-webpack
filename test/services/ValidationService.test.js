const ValidationService = require('../../lib/services/ValidationService');

describe('ValidationService', () => {
  it('should be defined', () => {
    expect(ValidationService).toBeDefined();
  });
  describe('isKarmaConfigValid', () => {
    let config;

    beforeEach(() => {
      config = {
        frameworks: ['jasmine', 'webpack'],
      };
    });

    it('should return true when passed a valid configuration', () => {
      expect(ValidationService.isKarmaConfigValid(config)).toBe(true);
    });
    it('should return false if the passed configuration does not contain the webpack framework.', () => {
      config.frameworks = ['jasmine'];
      expect(ValidationService.isKarmaConfigValid(config)).toBe(false);
    });
  });
});
