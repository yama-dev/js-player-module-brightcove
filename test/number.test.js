const assert = require('node:assert/strict');
const {
  parseNumber,
  pad,
  toFixedNumber,
} = require('../.tmp-test/number');

assert.equal(parseNumber(0), '00');
assert.equal(parseNumber(1), '01');
assert.equal(parseNumber(10), '10');
assert.equal(parseNumber('09'), '09');

assert.equal(pad(1, 2, '0'), '01');
assert.equal(pad('abc', 5, '_'), '__abc');
assert.equal(pad('abc', 2, '0'), 'abc');

assert.equal(toFixedNumber(0.1234, 3), 0.123);
assert.equal(toFixedNumber(12.345, 1), 12.3);

console.log('number helpers: ok');
