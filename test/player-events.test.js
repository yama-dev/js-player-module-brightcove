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
const windowHandlers = {};
const playerHandlers = {};
let playerCurrentTime = 0;
const calls = [];
const seekbar = createElement(100, 200);
const child = createElement(100, 40);
const context = {
  PlayerChangeSeekingFlg: false,
  Player: {
    hasStarted() {
      return false;
    },
    duration() {
      return 100;
    },
    currentTime(time) {
      if(time === undefined) return playerCurrentTime;
      playerCurrentTime = time;
      calls.push(['currentTime', time]);
    },
    on(eventName, handler) {
      playerHandlers[eventName] = handler;
    },
  },
  $: {
    uiSeekbarTime: ['seekbar'],
    uiSeekbarTimeCover: ['cover'],
  },
  Update(time) {
    calls.push(['Update', time]);
  },
};
const DOM = {
  addEvent(target, eventName, handler) {
    if(target === window) {
      windowHandlers[eventName] = handler;
    } else {
      handlers[eventName] = handler;
    }
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

windowHandlers.touchend();
playerHandlers.play();
playerCurrentTime = 50;
playerHandlers.timeupdate();
assert.equal(context.PlayerChangeSeekingFlg, true);
playerCurrentTime = 100;
playerHandlers.timeupdate();
assert.equal(context.PlayerChangeSeekingFlg, true);
playerHandlers.timeupdate();

assert.deepEqual(calls, [
  ['setStyle', ['cover'], { width: '20%' }],
  ['Update', 20],
  ['setStyle', ['cover'], { width: '100%' }],
  ['Update', 100],
  ['Update', 100],
  ['Update', 100],
  ['currentTime', 100],
  ['Update', undefined],
]);
assert.equal(context.PlayerChangeSeekingFlg, false);
assert.equal(typeof windowHandlers.touchcancel, 'function');

console.log('player events: ok');
