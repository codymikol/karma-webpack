/**
 * Simple hash function by bryc
 * https://gist.github.com/iperelivskiy/4110988#gistcomment-2697447
 */
function hash(s) {
  let h = 0xdeadbeef;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 2654435761); // eslint-disable-line no-bitwise
  }
  return (h ^ (h >>> 16)) >>> 0; // eslint-disable-line no-bitwise
}

module.exports = { hash };
