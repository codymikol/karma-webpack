const { hash } = require('../../../lib/utils/hash');

describe('HashService', () => {
  it('should be able to reproducibly hash a string into a number', () => {
    expect(hash('test')).toBe(3311036531);
  });
});
