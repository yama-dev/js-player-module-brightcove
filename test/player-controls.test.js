const assert = require('node:assert/strict');
const {
  playPlayer,
  stopPlayer,
  pausePlayer,
  mutePlayer,
  seekPlayerTo,
  setPlayerVolume,
} = require('../.tmp-test/player/player-controls');

function createPlayer(paused = true) {
  const calls = [];
  let muted = false;
  let volume = 1;
  let currentTime = 10;

  return {
    calls,
    paused() {
      return paused;
    },
    play() {
      calls.push('play');
      paused = false;
    },
    pause() {
      calls.push('pause');
      paused = true;
    },
    muted(value) {
      if (value === undefined) return muted;
      muted = value;
      calls.push(['muted', value]);
    },
    volume(value) {
      if (value === undefined) return volume;
      volume = value;
      calls.push(['volume', value]);
    },
    currentTime(value) {
      if (value === undefined) return currentTime;
      currentTime = value;
      calls.push(['currentTime', value]);
    },
  };
}

function createContext(player = createPlayer()) {
  const calls = [];
  return {
    calls,
    instance: { id: 'instance1' },
    player,
    config: {
      volume: 0.7,
      classname_active: 'is-active',
    },
    callbacks: {
      PlayPrep: null,
      Play: null,
      Pause: null,
      Stop: null,
    },
    cache: {
      uiBtnMute: ['mute-button'],
    },
    classOn() {
      calls.push('classOn');
    },
    classOff() {
      calls.push('classOff');
    },
    pause() {
      calls.push('contextPause');
    },
    setVolume(vol) {
      calls.push(['setVolume', vol]);
    },
  };
}

const playContext = createContext(createPlayer(true));
let playPrepCalled = 0;
let playCalled = 0;

playPlayer(playContext, false, () => {
  playPrepCalled += 1;
});

playContext.callbacks.Play = () => {
  playCalled += 1;
};
playPlayer(playContext, true);

assert.equal(playPrepCalled, 3);
assert.equal(playCalled, 1);
assert.deepEqual(playContext.player.calls, ['play', 'play']);
assert.deepEqual(playContext.calls, ['classOn', 'classOn']);

const playingContext = createContext(createPlayer(false));
playPlayer(playingContext);
assert.deepEqual(playingContext.calls, ['contextPause', 'classOff']);

const pauseContext = createContext(createPlayer(false));
let pauseCalled = 0;
pausePlayer(pauseContext, () => {
  pauseCalled += 1;
});
assert.equal(pauseCalled, 1);
assert.deepEqual(pauseContext.player.calls, ['pause']);
assert.deepEqual(pauseContext.calls, ['classOff']);

const stopContext = createContext(createPlayer(false));
let stopCalled = 0;
stopPlayer(stopContext, () => {
  stopCalled += 1;
});
assert.equal(stopCalled, 1);
assert.deepEqual(stopContext.player.calls, ['pause', ['currentTime', 0]]);
assert.deepEqual(stopContext.calls, ['classOff']);

const domCalls = [];
const DOM = {
  addClass(target, className) {
    domCalls.push(['addClass', target, className]);
  },
  removeClass(target, className) {
    domCalls.push(['removeClass', target, className]);
  },
};
const muteContext = createContext(createPlayer(false));
mutePlayer(muteContext, DOM);
mutePlayer(muteContext, DOM);

assert.deepEqual(muteContext.player.calls, [
  ['muted', true],
  ['volume', 0],
  ['muted', false],
]);
assert.deepEqual(muteContext.calls, [['setVolume', 0.7]]);
assert.deepEqual(domCalls, [
  ['addClass', ['mute-button'], 'is-active'],
  ['removeClass', ['mute-button'], 'is-active'],
]);

const seekPlayer = createPlayer();
assert.equal(seekPlayerTo(seekPlayer, 0), false);
assert.equal(seekPlayerTo(seekPlayer, {}), false);
assert.equal(seekPlayerTo(seekPlayer, '12'), undefined);
assert.deepEqual(seekPlayer.calls, [['currentTime', 12]]);

const volumePlayer = createPlayer();
const volumeConfig = { volume: 0.5 };
assert.equal(setPlayerVolume(volumePlayer, volumeConfig, -1), false);
assert.equal(setPlayerVolume(volumePlayer, volumeConfig, 1.2), false);
assert.equal(setPlayerVolume(volumePlayer, volumeConfig, 0.25), undefined);
assert.equal(volumeConfig.volume, 0.25);
assert.equal(setPlayerVolume(volumePlayer, volumeConfig, 'off'), undefined);
assert.deepEqual(volumePlayer.calls, [
  ['volume', 0.25],
  ['volume', 0],
]);

console.log('player controls: ok');
