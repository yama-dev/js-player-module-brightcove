import {
  PARSE_MODULE
} from '@yama-dev/js-parse-module/dist/js-parse-module';

import {
  viewPlayerScriptcode,
} from '../utils/common';

import {
  PlayerDomCache
} from '../dom/dom-cache';

import {
  PlayerConfig
} from '../types';

import {
  viewPlayerMain,
  viewPlayerUi,
} from '../dom/view-dom';

import {
  viewPlayerStyle
} from '../dom/view-style';

const Str2Mustache = PARSE_MODULE.Str2Mustache;

export interface PlayerMarkup {
  playerHtml: string;
  playerUiHtml: string;
  playerCss: string;
  playerCssOption: string;
  playerScriptCode: string;
}

export function createPlayerMarkup(config: PlayerConfig): PlayerMarkup {
  const formattedConfig = {
    ...config,
    poster: config.poster ? `poster="${config.poster}"` : '',
    title: config.video_title ? `title="${config.video_title}"` : '',
  };

  let playerCssOption = '';

  if(config.mode == 'audio'){
    playerCssOption += `
#${config.id} #${config.player_id_wrap} {
  width: 1px;
  height: 1px;
  padding-top: 0;
  overflow: hidden;
  position: absolute;
  opacity: 0.00001;
  pointer-events: none;
}
#${config.id} #${config.player_id} {
  width: 1px;
  height: 1px;
  opacity: 0.00001;
}`;
  }

  if(config.add_style){
    playerCssOption += config.add_style;
  }

  return {
    playerHtml        : Str2Mustache(viewPlayerMain, formattedConfig),
    playerUiHtml      : Str2Mustache(viewPlayerUi, formattedConfig),
    playerCss         : Str2Mustache(viewPlayerStyle, formattedConfig),
    playerCssOption   : playerCssOption,
    playerScriptCode  : Str2Mustache(viewPlayerScriptcode, formattedConfig),
  };
}

export function mountPlayerElements(
  config: PlayerConfig,
  cache: PlayerDomCache,
  markup: PlayerMarkup,
  DOM: any,
  onScriptLoad: () => void
): void {
  // Player Ui.
  let playerUiHtmlDom       = document.createElement('div');
  playerUiHtmlDom.id        = config.player_ui_id;
  playerUiHtmlDom.innerHTML = markup.playerUiHtml;
  if(config.ui_default){
    cache.playerElem[0].insertBefore(playerUiHtmlDom, cache.playerElem[0].firstElementChild);
  }

  // Player Main.
  let playerHtmlDomWrap = document.createElement('div');
  playerHtmlDomWrap.id  = config.player_id_wrap;
  playerHtmlDomWrap.style.setProperty('--pmb-padding-top', config.aspect_ratio_padding);
  playerHtmlDomWrap.innerHTML = markup.playerHtml;
  cache.playerElem[0].insertBefore(playerHtmlDomWrap, cache.playerElem[0].firstElementChild);

  // Player Style.
  let playerCssDom          = document.createElement('style');
  playerCssDom.innerHTML    = markup.playerCss;
  playerCssDom.id           = config.id+'_scripttag';
  if(config.ui_default_css){
    playerCssDom.innerHTML = markup.playerCss;
    playerCssDom.innerHTML += markup.playerCssOption;
    if(!DOM.selectDom(`#${config.id} #${config.player_style_id}`)){
      cache.playerElem[0].appendChild(playerCssDom);
    }
  } else {
    playerCssDom.innerHTML = markup.playerCssOption;
    if(!DOM.selectDom(`#${config.id} #${config.player_style_id}`)){
      cache.playerElem[0].appendChild(playerCssDom);
    }
  }

  // Set ScriptTag
  let s = document.createElement('script');
  s.id  = `${config.id}_scripttag`;
  s.onload = function(){
    onScriptLoad();
  };
  s.onerror = function(){
    console.log('ERROR: not script loaded.');
  };
  s.src = `${markup.playerScriptCode}?${Date.now()}`;

  document.body.appendChild(s);
}
