global.window = global;
global.self = global;
global.HTMLElement = class {};
global.navigator = {
  maxTouchPoints: 0,
};

const PLAYER_MODULE_BRIGHTCOVE = require('../dist/js-player-module-brightcove.js');
const fs = require('node:fs');
const path = require('node:path');

const bundlePath = path.resolve(__dirname, '../dist/js-player-module-brightcove.js');
const bundle = fs.readFileSync(bundlePath, 'utf8').trim();

if (typeof PLAYER_MODULE_BRIGHTCOVE !== 'function') {
  throw new Error('UMD bundle should export PLAYER_MODULE_BRIGHTCOVE constructor');
}

if (bundle.split(/\r?\n/).length !== 2) {
  throw new Error('UMD bundle should not contain multiline template literals');
}

console.log('bundle export: ok');
