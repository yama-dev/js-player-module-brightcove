/*eslint no-undef: 0*/
/*eslint no-console: 0*/
/*eslint no-useless-escape: 0*/

import JS_DOM from '@yama-dev/js-dom';
const DOM = new JS_DOM();

import {
  pad,
  parseNumber,
  toFixedNumber
} from './number';

import {
  PlayerDomCache,
  createEmptyDomCache,
  selectPlayerDomCache
} from './dom-cache';

import {
  getPlayerTime,
  getPlayerTimeDown,
  getPlayerTimeInfo,
  getPlayerTimeMax,
  getPlayerTimePar,
  getPlayerTimeRatio
} from './player-time';

import {
  createPlayerMarkup,
  mountPlayerElements
} from './player-renderer';

import {
  registerPlayerLifecycle
} from './player-lifecycle';

import {
  addGlobalPlayer,
  pauseAllPlayers,
  stopAllPlayers
} from './player-registry';

import {
  activatePlayerUi,
  deactivatePlayerUi,
  renderEmptyTime,
  renderPlayingTime
} from './player-ui-state';

import {
  mutePlayer,
  pausePlayer,
  playPlayer,
  seekPlayerTo,
  setPlayerVolume,
  stopPlayer
} from './player-controls';

import {
  changePlayerMedia
} from './player-change';

import {
  bindEventChangeVideo,
  bindEventMute,
  bindEventPause,
  bindEventPlay,
  bindEventSeekbarTime,
  bindEventSeekbarVol,
  bindEventStop,
  bindEventVoloff,
  bindEventVolon
} from './player-events';

import {
  DEFAULT_CALLBACKS,
  DEFAULT_CONFIG,
  createPlayerConfig
} from './config';

import {
  PlayerCallbacks,
  PlayerConfig,
  PlayerOptions
} from './types';

export class PLAYER_MODULE_BRIGHTCOVE {
  // Set Version.
  VERSION = process.env.VERSION;

  // Set Flgs.
  PlayerChangeLoadFlg = true;

  // Set config, options.
  CONFIG: PlayerConfig = { ...DEFAULT_CONFIG };

  on: PlayerCallbacks = { ...DEFAULT_CALLBACKS };

  // BrightcovePlayer Instance.
  Player = null;

  // BrightcovePlayer dom.
  $: PlayerDomCache = createEmptyDomCache();

  playerHtml       = '';
  playerUiHtml     = '';
  playerCss        = '';
  playerCssOption  = '';
  playerScriptCode = '';

  PlayerJson = {};

  PlayerChangeSeekingFlg = false;

  state = {
    poster: ''
  }

  constructor(options: PlayerOptions){

    if(!options.id || !options.videoid){
      console.log('Inadequate parameters (id, videoid)');
      // return false;
    }

    this.CONFIG = createPlayerConfig(options);

    // Set config, callback functions.
    if(options.on){
      this.on = {
        ...this.on,
        ...options.on,
      };
    }

    // Player wrapper.
    this.$.playerElem = DOM.selectDom(`#${this.CONFIG.id}`);

    if(this.CONFIG.mode == 'audio'){
      this.CONFIG.width  = '1';
      this.CONFIG.height = '1';
    }

    let playerMarkup = createPlayerMarkup(this.CONFIG);
    this.playerHtml        = playerMarkup.playerHtml;
    this.playerUiHtml      = playerMarkup.playerUiHtml;
    this.playerCss         = playerMarkup.playerCss;
    this.playerCssOption   = playerMarkup.playerCssOption;
    this.playerScriptCode  = playerMarkup.playerScriptCode;

    // SetPlayer
    if(document.readyState == 'complete' || document.readyState == 'interactive'){
      this.BuildPlayer();
    } else {
      document.addEventListener('DOMContentLoaded', ()=>{
        this.BuildPlayer();
      });
    }

  }

  private BuildPlayer(){
    mountPlayerElements(
      this.CONFIG,
      this.$,
      {
        playerHtml: this.playerHtml,
        playerUiHtml: this.playerUiHtml,
        playerCss: this.playerCss,
        playerCssOption: this.playerCssOption,
        playerScriptCode: this.playerScriptCode,
      },
      DOM,
      () => {
        this.PlayerInstance();
      }
    );

    // CacheElement
    this.CacheElement();
  }

  PlayerInstance(){
    // Set Instance
    this.Player = videojs(this.CONFIG.player_id);

    // Set PlayerJson
    this.PlayerJson = this.Player.toJSON();

    this.EventPlay();
    this.EventPause();
    this.EventStop();
    this.EventMute();
    this.EventVolon();
    this.EventVoloff();
    this.EventSeekbarVol();
    this.EventSeekbarTime();
    this.EventChangeVideo();

    this.AddGlobalObject();

    registerPlayerLifecycle({
      instance: this,
      player: this.Player,
      config: this.CONFIG,
      callbacks: this.on,
      getCache: () => this.$,
      setVolume: (volume: number) => {
        this.SetVolume(volume);
      },
      setInfo: () => {
        this._setInfo();
      },
      setPoster: () => {
        this.SetPoster();
      },
      update: () => {
        this.Update();
      },
      stop: () => {
        this.Stop();
      },
      classOn: () => {
        this.ClassOn();
      },
      classOff: () => {
        this.ClassOff();
      },
    }, DOM);
  }

  AddGlobalObject(){
    addGlobalPlayer(this, this.Player, this.CONFIG);
  }

  CacheElement(){
    this.$ = selectPlayerDomCache(DOM, this.CONFIG);
  }

  EventPlay(){
    bindEventPlay(this, DOM);
  }

  EventPause(){
    bindEventPause(this, DOM);
  }

  EventStop(){
    bindEventStop(this, DOM);
  }

  EventMute(){
    bindEventMute(this, DOM);
  }

  EventVolon(){
    bindEventVolon(this, DOM);
  }

  EventVoloff(){
    bindEventVoloff(this, DOM);
  }

  /**
   * When dragging a seek bar(volume).
   */
  EventSeekbarVol(){
    bindEventSeekbarVol(this, DOM);
  }

  /**
   * When dragging a seek bar(time).
   */
  EventSeekbarTime(){
    bindEventSeekbarTime(this, DOM);
  }

  EventChangeVideo(){
    bindEventChangeVideo(this, DOM);
  }

  ClassOn(){
    this.CacheElement();
    activatePlayerUi(this.$, this.CONFIG, DOM);
  }

  ClassOff(){
    this.CacheElement();
    deactivatePlayerUi(this.$, this.CONFIG, DOM);
  }

  Update(){
    // Not change value at seeking.
    if(this.PlayerChangeSeekingFlg) return;

    // Determine while changing media.
    if(this.PlayerChangeLoadFlg){
      let timeInfo = getPlayerTimeInfo(this.Player);
      renderPlayingTime(this.$, timeInfo, this.on, DOM);
    } else {
      renderEmptyTime(this.$, DOM);
    }

  }

  private _getControlContext(){
    return {
      instance: this,
      player: this.Player,
      config: this.CONFIG,
      callbacks: this.on,
      cache: this.$,
      classOn: () => {
        this.ClassOn();
      },
      classOff: () => {
        this.ClassOff();
      },
      pause: (callback?: () => {}) => {
        this.Pause(callback);
      },
      setVolume: (vol?: number | 'off') => {
        return this.SetVolume(vol);
      },
    };
  }

  private _getChangeContext(){
    return {
      instance: this,
      player: this.Player,
      config: this.CONFIG,
      callbacks: this.on,
      cache: this.$,
      isPlayerChangeLoad: () => {
        return this.PlayerChangeLoadFlg;
      },
      setPlayerChangeLoad: (loadable: boolean) => {
        this.PlayerChangeLoadFlg = loadable;
      },
      setInfo: () => {
        this._setInfo();
      },
      setPoster: () => {
        this.SetPoster();
      },
      classOff: () => {
        this.ClassOff();
      },
      play: (forceplay?: boolean, callback?: () => {}) => {
        this.Play(forceplay, callback);
      },
    };
  }

  Play(forceplay?: boolean, callback?: ()=>{}){
    playPlayer(this._getControlContext(), forceplay, callback);
  }

  Stop(callback?: ()=>{}){
    stopPlayer(this._getControlContext(), callback);
  }

  Pause(callback?: ()=>{}){
    pausePlayer(this._getControlContext(), callback);
  }

  Mute(){
    mutePlayer(this._getControlContext(), DOM);
  }

  /**
   * When Media change.
   *
   * id       | str      | media-id.
   * isplay   | boolean  | auto start after changed media.
   * callback | function | callback function after changed media.
   */
  Change(id: any, isplay : boolean | null = null, callback?: ()=>{}){
    return changePlayerMedia(this._getChangeContext(), DOM, id, isplay, callback);
  }

  PauseAll(callback?: ()=>{}){
    pauseAllPlayers();

    if(!this.on.PauseAll && callback) this.on.PauseAll = callback;
    if(this.on.PauseAll && typeof(this.on.PauseAll) === 'function') this.on.PauseAll(this, this.Player);
  }

  StopAll(callback?: ()=>{}){
    stopAllPlayers();

    if(!this.on.StopAll && callback) this.on.StopAll = callback;
    if(this.on.StopAll && typeof(this.on.StopAll) === 'function') this.on.StopAll(this, this.Player);
  }

  SeekTo(sec: any){
    return seekPlayerTo(this.Player, sec);
  }

  GetTime(){
    return getPlayerTime(this.Player);
  }

  GetTimeDown(){
    return getPlayerTimeDown(this.Player);
  }

  GetTimeMax(){
    return getPlayerTimeMax(this.Player);
  }

  GetTimeRatio(){
    return getPlayerTimeRatio(this.Player);
  }

  GetTimePar(){
    return getPlayerTimePar(this.Player);
  }

  GetPoster(){
    return this.Player.poster();
  }

  GetMediaInfo(){
    return this.Player.mediainfo;
  }

  SetVolume(vol?: number | 'off'){
    return setPlayerVolume(this.Player, this.CONFIG, vol);
  }

  /**
   * video-tag set attribute 'title'.
   *
   * @param {string} title
   */
  SetVideoTitle(title: string){
    this.Player.el().querySelector('video').setAttribute('title', title);
  }

  Destroy(){
    this.Player.reset();
  }

  SetPoster(path?: string){
    if(path !== undefined && path !== null){
      this.Player.poster(path);
    }

    this.state.poster = this.GetPoster();

    if(this.state.poster){
      if(this.$.uiDisplayPoster){
        if(this.CONFIG.mode == 'audio'){
          DOM.setHtml(this.$.uiDisplayPoster, '');
        } else {
          DOM.setHtml(this.$.uiDisplayPoster, `<img src="${this.state.poster}" alt="">`);
        }
      }

      if(this.$.uiDisplayPosterBg && this.CONFIG.mode != 'audio'){
        DOM.setStyle(this.$.uiDisplayPosterBg, { backgroundImage : `url(${this.state.poster})` });
      }
    }
  }

  private _setInfo(){
    if(this.$.uiDisplayName) DOM.setHtml(this.$.uiDisplayName, this.Player.mediainfo.name);
  }

  // 0 -> 00
  // 1 -> 01
  // 10 -> 10
  static parseNumber(num: number|string): string {
    return parseNumber(num);
  }

  static pad(n: number|string, width: number, z: string): string {
    return pad(n, width, z);
  }

  static toFixedNumber(num: number|string, digits: number, base?: number) {
    return toFixedNumber(num, digits, base);
  }

}
