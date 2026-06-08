const assert = require('node:assert/strict');

global.window = {
  ontouchstart: true,
};

const {
  bindEventSeekbarTime,
  getSeekbarRatio,
} = require('../.tmp-test/player/player-events');

function createElement(left, width) {
  return {
    clientWidth: width,
    getBoundingClientRect() {
      return {
        left,
        width,
      };
    },
  };
}

assert.equal(getSeekbarRatio(createElement(100, 200), 140), 0.2);
assert.equal(getSeekbarRatio(createElement(100, 200), 40), 0);
assert.equal(getSeekbarRatio(createElement(100, 200), 340), 1);

const handlers = {};
const calls = [];
const seekbar = createElement(100, 200);
const child = createElement(100, 40);
const context = {
  PlayerChangeSeekingFlg: false,
  Player: {
    duration() {
      return 100;
    },
    currentTime(time) {
      calls.push(['currentTime', time]);
    },
  },
  $: {
    uiSeekbarTime: ['seekbar'],
    uiSeekbarTimeCover: ['cover'],
  },
  Play() {},
};
const DOM = {
  addEvent(target, eventName, handler) {
    handlers[eventName] = handler;
  },
  setStyle(target, style) {
    calls.push(['setStyle', target, style]);
  },
};

bindEventSeekbarTime(context, DOM);

handlers.touchstart({
  currentTarget: seekbar,
  touches: [{
    target: child,
    clientX: 140,
  }],
});

handlers.touchmove({
  currentTarget: seekbar,
  touches: [{
    target: child,
    clientX: 340,
  }],
});

assert.deepEqual(calls, [
  ['setStyle', ['cover'], { width: '20%' }],
  ['currentTime', 20],
  ['setStyle', ['cover'], { width: '100%' }],
  ['currentTime', 100],
]);

console.log('player events: ok');
