/* eslint-disable no-undef */
import AdvancedMath from './js-source-example';

describe('test one example', () => {
  it('an example passing test', () => {
    assert.equal(1, 1);
  });
});

describe('test two example', () => {
  it('an example failing test', () => {
    assert.equal(1, 0);
  });
});

describe('bundled js content', () => {
  it('should be able to bundle js content', () => {
    assert.equal(!!AdvancedMath.add, true);
  });
  it('should be able to interpret bundled js content', () => {
    assert.equal(AdvancedMath.add(1, 1), 2);
  });
});
