const assert = require('node:assert/strict');
const {
  addGlobalPlayer,
  pauseAllPlayers,
  stopAllPlayers,
} = require('../.tmp-test/player/player-registry');

global.window = {};

const calls = [];
const instance = {
  Pause() {
    calls.push('pause');
  },
  Stop() {
    calls.push('stop');
  },
};
const player = {};
const config = {
  videoid: 'video1',
  id: 'player1',
  player_id: 'player1_player',
};

addGlobalPlayer(instance, player, config);

assert.equal(window.PLAYER_MODULE_ALL_PLATLIST.length, 1);
assert.deepEqual(window.PLAYER_MODULE_ALL_PLATLIST[0], {
  instance,
  Player: player,
  videoid: 'video1',
  id: 'player1',
  player_id: 'player1_player',
});

pauseAllPlayers();
stopAllPlayers();

assert.deepEqual(calls, ['pause', 'stop']);

console.log('player registry: ok');
