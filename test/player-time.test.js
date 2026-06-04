const assert = require('assert');
const {
  getPlayerTime,
  getPlayerTimeDown,
  getPlayerTimeMax,
  getPlayerTimeRatio,
  getPlayerTimePar,
  getPlayerTimeInfo
} = require('../.tmp-test/player/player-time');

function createPlayer(current, duration) {
  return {
    currentTime() {
      return current;
    },
    duration() {
      return duration;
    }
  };
}

const player = createPlayer(62.4, 125.9);

assert.strictEqual(getPlayerTime(player), '01:02');
assert.strictEqual(getPlayerTimeDown(player), '01:03');
assert.strictEqual(getPlayerTimeMax(player), '02:05');
assert.strictEqual(getPlayerTimeRatio(player), 0.495);
assert.strictEqual(getPlayerTimePar(player), '49.5%');
assert.deepStrictEqual(getPlayerTimeInfo(player), {
  current: '01:02',
  max: '02:05',
  down: '01:03',
  ratio: 0.495,
  par: '49.5%'
});

assert.strictEqual(getPlayerTimePar(createPlayer(0, 0)), '0%');
assert.strictEqual(getPlayerTime(createPlayer(NaN, 100)), '00:00');
assert.strictEqual(getPlayerTimeDown(createPlayer(NaN, 100)), '00:00');
assert.strictEqual(getPlayerTimeMax(createPlayer(0, 0)), '00:00');
assert.strictEqual(getPlayerTimeRatio(createPlayer(0, 0)), NaN);
assert.strictEqual(getPlayerTimePar(createPlayer(1, 3)), '33.3%');
assert.strictEqual(getPlayerTime(createPlayer(3599.9, 3600)), '59:59');
assert.strictEqual(getPlayerTimeDown(createPlayer(3599.9, 3600)), '00:01');

console.log('player time helpers: ok');
