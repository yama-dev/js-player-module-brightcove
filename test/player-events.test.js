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
let playerHasStarted = false;
const calls = [];
const seekbar = createElement(100, 200);
const child = createElement(100, 40);
const context = {
  PlayerChangeSeekingFlg: false,
  Player: {
    hasStarted() {
      return playerHasStarted;
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
    clientX: 260,
  }],
});

windowHandlers.touchend();
playerHasStarted = true;
playerHandlers.play();
playerCurrentTime = 50;
playerHandlers.timeupdate();
assert.equal(context.PlayerChangeSeekingFlg, true);
playerCurrentTime = 80;
playerHandlers.timeupdate();
assert.equal(context.PlayerChangeSeekingFlg, true);
playerHandlers.timeupdate();

handlers.touchstart({
  currentTarget: seekbar,
  touches: [{
    target: child,
    clientX: 180,
  }],
});
windowHandlers.touchend();

assert.deepEqual(calls, [
  ['setStyle', ['cover'], { width: '20%' }],
  ['Update', 20],
  ['setStyle', ['cover'], { width: '80%' }],
  ['Update', 80],
  ['Update', 80],
  ['Update', 80],
  ['currentTime', 80],
  ['Update', undefined],
  ['setStyle', ['cover'], { width: '40%' }],
  ['currentTime', 40],
  ['Update', 40],
  ['Update', 40],
]);
assert.equal(context.PlayerChangeSeekingFlg, false);
assert.equal(typeof windowHandlers.touchcancel, 'function');

console.log('player events: ok');
