const assert = require('node:assert/strict');
const {
  parseNumber,
  pad,
  toFixedNumber,
} = require('../.tmp-test/utils/number');

assert.equal(parseNumber(0), '00');
assert.equal(parseNumber(1), '01');
assert.equal(parseNumber(10), '10');
assert.equal(parseNumber('09'), '09');
assert.equal(parseNumber(''), '0');
assert.equal(parseNumber(-1), '-1');
assert.equal(parseNumber(9.5), '9.5');

assert.equal(pad(1, 2, '0'), '01');
assert.equal(pad('abc', 5, '_'), '__abc');
assert.equal(pad('abc', 2, '0'), 'abc');
assert.equal(pad('', 3, '0'), '000');
assert.equal(pad(7, 3, ''), '007');

assert.equal(toFixedNumber(0.1234, 3), 0.123);
assert.equal(toFixedNumber(12.345, 1), 12.3);
assert.equal(toFixedNumber('12.345', 2), 12.35);
assert.equal(toFixedNumber(1.25, 1, 2), 1.5);

console.log('number helpers: ok');
