import AdvancedMath from './js-source-example';

const assert = require('assert');

describe('test one example', () => {
  it('an example passing test', () => {
    assert.strictEqual(1, 1);
  });
});

describe('test two example', () => {
  it('an example failing test', () => {
    assert.strictEqual(1, 0);
  });
});

describe('bundled js content', () => {
  it('should be able to bundle js content', () => {
    assert.strictEqual(!!AdvancedMath.add, true);
  });
  it('should be able to interpret bundled js content', () => {
    assert.strictEqual(AdvancedMath.add(1, 1), 2);
  });
});
