const assert = require('node:assert/strict');

global.window = global;

const {
  createPlayerMarkup,
  mountPlayerElements,
} = require('../.tmp-test/player/player-renderer');

const createdElements = [];

global.document = {
  body: {
    appendChild(element) {
      appendedElements.push(element);
    },
  },
  createElement(tagName) {
    const element = {
      tagName,
      id: '',
      innerHTML: '',
      style: {
        values: {},
        setProperty(name, value) {
          this.values[name] = value;
        },
      },
      onload: null,
      onerror: null,
      src: '',
    };
    createdElements.push(element);
    return element;
  },
};

const insertedElements = [];
const appendedElements = [];
const cache = {
  playerElem: [{
    firstElementChild: { id: 'first-child' },
    insertBefore(element, before) {
      insertedElements.push({ element, before });
    },
    appendChild(element) {
      appendedElements.push(element);
    },
  }],
};
const config = {
  id: 'player1',
  player_ui_id: 'player1_ui',
  player_id_wrap: 'player1_player_wrap',
  player_style_id: 'player1_style',
  aspect_ratio_padding: '177.77777777777777%',
  ui_default: true,
  ui_default_css: false,
};
const markup = {
  playerHtml: '<video></video>',
  playerUiHtml: '<button class="ui-btn-play">play</button>',
  playerCss: '.player{}',
  playerCssOption: '.option{}',
  playerScriptCode: 'window.loaded = true;',
};
const DOM = {
  selectDom() {
    return null;
  },
};

let scriptLoaded = 0;
mountPlayerElements(config, cache, markup, DOM, () => {
  scriptLoaded += 1;
});

assert.equal(insertedElements[0].element.id, 'player1_ui');
assert.equal(insertedElements[0].element.innerHTML, markup.playerUiHtml);
assert.equal(insertedElements[1].element.id, 'player1_player_wrap');
assert.equal(insertedElements[1].element.style.values['--pmb-padding-top'], '177.77777777777777%');
assert.equal(insertedElements[1].element.innerHTML, markup.playerHtml);
assert.equal(appendedElements[0].tagName, 'style');
assert.equal(appendedElements[0].innerHTML, markup.playerCssOption);
assert.equal(appendedElements[1].tagName, 'script');
assert.equal(appendedElements[1].id, 'player1_scripttag');
assert.equal(appendedElements[1].src.startsWith(`${markup.playerScriptCode}?`), true);

appendedElements[1].onload();
assert.equal(scriptLoaded, 1);

const audioMarkup = createPlayerMarkup({
  mode: 'audio',
  id: 'audio1',
  player_id: 'audio1_player',
  player_id_wrap: 'audio1_player_wrap',
  player_ui_id: 'audio1_ui',
  player_style_id: 'audio1_style',
  videoid: 'video1',
  account: 'account1',
  player: 'default',
  width: '1',
  height: '1',
  video_title: '',
  poster: '',
  ui_controls: '',
  ui_autoplay: '',
  playsinline: '',
  loop: '',
  muted: '',
  add_style: '',
});

assert.equal(audioMarkup.playerCssOption.includes('#audio1 #audio1_player_wrap'), true);
assert.equal(audioMarkup.playerCssOption.includes('#audio1 #audio1_player'), true);
assert.equal(audioMarkup.playerCssOption.includes('width: 1px;'), true);
assert.equal(audioMarkup.playerCssOption.includes('height: 1px;'), true);
assert.equal(audioMarkup.playerCssOption.includes('padding-top: 0;'), true);
assert.equal(audioMarkup.playerCssOption.includes('opacity: 0.00001;'), true);
assert.equal(audioMarkup.playerCssOption.includes('pointer-events: none;'), true);

console.log('player renderer: ok');
