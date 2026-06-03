global.window = global;
global.self = global;
global.HTMLElement = class {};
global.navigator = {
  maxTouchPoints: 0,
};

const PLAYER_MODULE_BRIGHTCOVE = require('../dist/js-player-module-brightcove.js');

if (typeof PLAYER_MODULE_BRIGHTCOVE !== 'function') {
  throw new Error('UMD bundle should export PLAYER_MODULE_BRIGHTCOVE constructor');
}

console.log('bundle export: ok');
