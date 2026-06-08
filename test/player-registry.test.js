const assert = require('node:assert/strict');
const {
  addGlobalPlayer,
  pauseAllPlayers,
  pauseOtherPlayers,
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

const otherCalls = [];
const createRegistryItem = (playerId, paused) => ({
  instance: {
    Pause() {
      otherCalls.push(playerId);
    },
  },
  Player: {
    paused() {
      return paused;
    },
  },
  config: {
    videoid: `${playerId}_video`,
    id: playerId,
    player_id: playerId,
  },
});

window.PLAYER_MODULE_ALL_PLATLIST = [];

const activePlayer = createRegistryItem('active_player', false);
const playingPlayer = createRegistryItem('playing_player', false);
const pausedPlayer = createRegistryItem('paused_player', true);

addGlobalPlayer(activePlayer.instance, activePlayer.Player, activePlayer.config);
addGlobalPlayer(playingPlayer.instance, playingPlayer.Player, playingPlayer.config);
addGlobalPlayer(pausedPlayer.instance, pausedPlayer.Player, pausedPlayer.config);

pauseOtherPlayers('active_player');

assert.deepEqual(otherCalls, ['playing_player']);

console.log('player registry: ok');
