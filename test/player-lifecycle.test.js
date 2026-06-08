const assert = require('node:assert/strict');
const {
  registerPlayerLifecycle,
} = require('../.tmp-test/player/player-lifecycle');

global.window = {
  PLAYER_MODULE_ALL_PLATLIST: [{
    instance: {
      Pause() {
        calls.push('pauseOther');
      },
    },
    Player: {
      paused() {
        return false;
      },
    },
    player_id: 'other_player',
  }],
};

const calls = [];
const handlers = {};
const player = {
  on(eventName, handler) {
    handlers[eventName] = handler;
  },
};
const context = {
  instance: {},
  player,
  config: {
    pause_others_on_play: true,
    player_id: 'active_player',
  },
  callbacks: {
    PlayerPlay() {
      calls.push('PlayerPlay');
    },
  },
  getCache() {
    return {};
  },
  setVolume() {},
  setInfo() {},
  setPoster() {},
  update() {},
  stop() {},
  classOn() {
    calls.push('classOn');
  },
  classOff() {},
};

registerPlayerLifecycle(context, {});
handlers.play();

assert.deepEqual(calls, ['pauseOther', 'classOn', 'PlayerPlay']);

console.log('player lifecycle: ok');
