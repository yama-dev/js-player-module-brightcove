const assert = require('node:assert/strict');
const {
  DEFAULT_CALLBACKS,
  DEFAULT_CONFIG,
  createPlayerConfig,
  getAspectRatioPadding,
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
assert.equal(config.ui_default_css, true);
assert.equal(config.aspect_ratio, '16:9');
assert.equal(config.aspect_ratio_padding, '56.25%');

const defaultedConfig = createPlayerConfig({});
assert.equal(defaultedConfig.id, 'pmb');
assert.equal(defaultedConfig.videoid, '4929511769001');
assert.equal(defaultedConfig.ui_default, true);
assert.equal(defaultedConfig.ui_default_css, true);
assert.equal(defaultedConfig.playsinline, 'webkit-playsinline playsinline');
assert.equal(defaultedConfig.loop, '');
assert.equal(defaultedConfig.muted, '');
assert.equal(defaultedConfig.ui_controls, '');
assert.equal(defaultedConfig.ui_autoplay, '');
assert.equal(defaultedConfig.pause_others_on_play, false);
assert.equal(defaultedConfig.stop_outfocus, false);
assert.equal(defaultedConfig.aspect_ratio, '16:9');
assert.equal(defaultedConfig.aspect_ratio_padding, '56.25%');

const enabledFlagsConfig = createPlayerConfig({
  id: 'player2',
  loop: true,
  muted: true,
  ui_controls: true,
  ui_autoplay: true,
  ui_default_css: false,
  pause_others_on_play: true,
  stop_outfocus: true,
  classname_loaded_wrap: 'loaded',
  classname_active_wrap: 'active-wrap',
  classname_active: 'active',
});

assert.equal(enabledFlagsConfig.loop, 'loop');
assert.equal(enabledFlagsConfig.muted, 'muted');
assert.equal(enabledFlagsConfig.ui_controls, 'controls');
assert.equal(enabledFlagsConfig.ui_autoplay, 'autoplay');
assert.equal(enabledFlagsConfig.ui_default_css, false);
assert.equal(enabledFlagsConfig.pause_others_on_play, true);
assert.equal(enabledFlagsConfig.stop_outfocus, true);
assert.equal(enabledFlagsConfig.classname_loaded_wrap, 'loaded');
assert.equal(enabledFlagsConfig.classname_active_wrap, 'active-wrap');
assert.equal(enabledFlagsConfig.classname_active, 'active');

const verticalConfig = createPlayerConfig({
  id: 'player3',
  aspect_ratio: '9:16',
});

assert.equal(verticalConfig.aspect_ratio, '9:16');
assert.equal(verticalConfig.aspect_ratio_padding, '177.77777777777777%');
assert.equal(getAspectRatioPadding('4:3'), '75%');
assert.equal(getAspectRatioPadding('21:9'), '42.857142857142854%');
assert.equal(getAspectRatioPadding('0:9'), '56.25%');
assert.equal(getAspectRatioPadding('abc'), '56.25%');

console.log('player config: ok');
