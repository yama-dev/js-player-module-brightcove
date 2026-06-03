const assert = require('node:assert/strict');
const {
  DEFAULT_CALLBACKS,
  DEFAULT_CONFIG,
  createPlayerConfig,
} = require('../.tmp-test/config');

assert.equal(DEFAULT_CONFIG.id, 'pmb');
assert.equal(DEFAULT_CONFIG.volume, 1);
assert.equal(DEFAULT_CALLBACKS.PlayerInit, null);

const config = createPlayerConfig({
  id: 'player1',
  videoid: 'video1',
  account: 'account1',
  volume: 0,
  playsinline: false,
  ui_default: false,
});

assert.equal(config.id, 'player1');
assert.equal(config.player_id, 'player1_player');
assert.equal(config.player_id_wrap, 'player1_player_wrap');
assert.equal(config.player_ui_id, 'player1_ui');
assert.equal(config.player_style_id, 'player1_style');
assert.equal(config.videoid, 'video1');
assert.equal(config.account, 'account1');
assert.equal(config.volume, 0);
assert.equal(config.playsinline, '');
assert.equal(config.ui_default, false);

console.log('player config: ok');
