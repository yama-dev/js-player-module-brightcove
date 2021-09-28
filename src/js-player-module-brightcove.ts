/*eslint no-undef: 0*/
/*eslint no-console: 0*/
/*eslint no-useless-escape: 0*/

// @ts-ignore
import * as DOM from '@yama-dev/js-dom/core';

// @ts-ignore
import {
  Str2Mustache
} from '@yama-dev/js-parse-module/libs';

import {
  viewPlayerScriptcode,
} from './common';

import {
  viewPlayerMain,
  viewPlayerUi,
} from './view-dom';

import {
  viewPlayerStyle
} from './view-style';

export class PLAYER_MODULE_BRIGHTCOVE implements PlayerModuleBrightcoveInterface {
  // Set Version.
  VERSION = process.env.VERSION;

  // Set Flgs.
  PlayerChangeLoadFlg = true;

  // Set config, options.
  CONFIG = {
    mode           : 'movie',
    id             : 'pmb',

    player_id        : 'pmb_player',
    player_id_wrap   : 'pmb_player_wrap',
    player_ui_id     : 'pmb_ui',
    player_style_id  : 'pmb_style',

    videoid        : '',
    account        : '',
    width          : '',
    height         : '',

    player         : 'default',
    volume         : 1,

    playsinline    : 'webkit-playsinline playsinline',
    loop           : '',
    muted          : '',

    ui_controls    : '',
    ui_autoplay    : '',
    ui_default     : false,
    ui_default_css : true,

    stop_outfocus  : false,
    poster         : true,

    add_style        : '',
    classname_active_wrap : 'is-pmb-wrap',
    classname_active : 'active'
  };

  on = {
    PlayerInit  : null,
    PlayerEnded : null,
    PlayerPlay  : null,
    PlayerPause : null,

    TimeUpdate : null,
    VolumeChange : null,

    PlayPrep: null,
    Play    : null,
    Pause   : null,
    Stop    : null,
    PauseAll: null,
    StopAll : null,
    Change  : null,
  };

  // BrightcovePlayer MediaInfo
  PlayerMediaInfo = {};

  // BrightcovePlayer Instance.
  Player;

  // BrightcovePlayer dom.
  $ = {
    playerElem                 : [],
    playerElemMain             : [],
    playerElemMainWrap         : [],
    uiBtnPlay                  : [],
    uiBtnStop                  : [],
    uiBtnPause                 : [],
    uiBtnMute                  : [],
    uiBtnVolon                 : [],
    uiBtnVoloff                : [],
    uiDisplayTime              : [],
    uiDisplayTimeNow           : [],
    uiDisplayTimeTotal         : [],
    uiDisplayTimeDown          : [],
    uiDisplayTimePar           : [],
    uiDisplayPoster            : [],
    uiDisplayPosterBg          : [],
    uiDisplayName              : [],
    uiSeekbarVol               : [],
    uiSeekbarVolBg             : [],
    uiSeekbarVolCover          : [],
    uiSeekbarTime              : [],
    uiSeekbarTimeBg            : [],
    uiSeekbarTimeCover         : [],
    uiBtnChange                : [],
    uiBtnDataId                : [],
  };

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

  constructor(options: any = {}){

    if(!options.id || !options.videoid){
      console.log('Inadequate parameters (id, videoid)');
      // return false;
    }

    this.CONFIG = {
      mode           : options.mode||'movie',
      id             : options.id||'pmb',

      player_id        : `${options.id}_player`||'pmb_player',
      player_id_wrap   : `${options.id}_player_wrap`||'pmb_player_wrap',
      player_ui_id     : `${options.id}_ui`||'pmb_ui',
      player_style_id  : `${options.id}_style`||'pmb_style',

      videoid        : options.videoid||'',
      account        : options.account||'',
      width          : options.width||'',
      height         : options.height||'',

      player         : options.player||'default',
      volume         : options.volume||1,

      playsinline    : options.playsinline !== false ? 'webkit-playsinline playsinline' : '',
      loop           : options.loop === true ? 'loop' : '',
      muted          : options.muted === true ? 'muted' : '',

      ui_controls    : options.ui_controls === true ? 'controls' : '',
      ui_autoplay    : options.ui_autoplay === true ? 'autoplay' : '',
      ui_default     : options.ui_default === false ? false : true,
      ui_default_css : options.ui_default_css === false ? false : true,

      stop_outfocus  : options.stop_outfocus === true ? true : false,
      poster         : options.poster||true,

      add_style        : options.add_style||'',
      classname_active_wrap : options.classname_active_wrap||'is-pmb-wrap',
      classname_active : options.classname_active||'active'
    };

    // Set config, callback functions.
    if(options.on){
      this.on = {
        ...this.on,
        ...options.on,
      };
    }

    // Player wrapper.
    this.$.playerElem = DOM.selectDom(`#${this.CONFIG.id}`);

    // Check Audio mode.
    if(this.CONFIG.mode == 'audio'){
      this.CONFIG.width  = '1';
      this.CONFIG.height = '1';
    }

    // Set Options
    // -> playerHtml
    // -> playerCss
    // -> playerScriptCode
    this.playerHtml        = Str2Mustache(viewPlayerMain, this.CONFIG);
    this.playerUiHtml      = Str2Mustache(viewPlayerUi, this.CONFIG);
    this.playerCss         = Str2Mustache(viewPlayerStyle, this.CONFIG);
    this.playerScriptCode  = Str2Mustache(viewPlayerScriptcode, this.CONFIG);

    // Check Audio mode.
    if(this.CONFIG.mode == 'audio'){
      this.playerCssOption += `#${this.CONFIG.player_id} { opacity: 0.001; }`;
    }

    // Check Add Style.
    if(this.CONFIG.add_style){
      this.playerCssOption += this.CONFIG.add_style;
    }

    // SetPlayer
    if(document.readyState == 'complete' || document.readyState == 'interactive'){
      this.BuildPlayer();
    } else {
      document.addEventListener('DOMContentLoaded', ()=>{
        this.BuildPlayer();
      });
    }

  }

  BuildPlayer(){
    let _that = this;

    // Player Ui.
    let playerUiHtmlDom       = document.createElement('div');
    playerUiHtmlDom.innerHTML = this.playerUiHtml;
    if(this.CONFIG.ui_default){
      this.$.playerElem[0].insertBefore(playerUiHtmlDom, this.$.playerElem[0].firstElementChild);
    }

    // Player Main.
    let playerHtmlDom         = document.createElement('div');
    let playerHtmlDomWrap = document.createElement('div');
    playerHtmlDom.id  = this.CONFIG.player_id;
    playerHtmlDomWrap.id  = this.CONFIG.player_id_wrap;
    playerHtmlDom.innerHTML   = this.playerHtml;
    playerHtmlDomWrap.appendChild(playerHtmlDom);
    this.$.playerElem[0].insertBefore(playerHtmlDomWrap, this.$.playerElem[0].firstElementChild);

    // Player Style.
    let playerCssDom          = document.createElement('style');
    playerCssDom.innerHTML    = this.playerCss;
    playerCssDom.id           = this.CONFIG.id+'_scripttag';
    if(this.CONFIG.ui_default_css){
      playerCssDom.innerHTML = this.playerCss;
      playerCssDom.innerHTML += this.playerCssOption;
      if(!DOM.selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_style_id}`)){
        this.$.playerElem[0].appendChild(playerCssDom);
      }
    } else {
      playerCssDom.innerHTML = this.playerCssOption;
      if(!DOM.selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_style_id}`)){
        this.$.playerElem[0].appendChild(playerCssDom);
      }
    }

    // CacheElement
    this.CacheElement();

    // Set ScriptTag
    let s = document.createElement('script');
    s.id  = `${this.CONFIG.id}_scripttag`;
    s.onload = function(){
      _that.PlayerInstance();
    };
    s.onerror = function(){
      console.log('ERROR: not script loaded.');
    };
    s.src = this.playerScriptCode+'?'+Date.now();

    document.body.appendChild(s);
  }

  PlayerInstance(){
    let _that = this;

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

    let _loadeddata_flg = false;
    this.Player.on('loadedmetadata', ()=>{
      if(_loadeddata_flg) return false;
      _loadeddata_flg = true;
      this.SetVolume(this.CONFIG.volume);
      this._setInfo();
      this._setPoster();
      this.Update();
      if(_that.on.PlayerInit && typeof(_that.on.PlayerInit) === 'function') _that.on.PlayerInit(_that, _that.Player);
    });
    this.Player.on('loadeddata', ()=>{
      if(_loadeddata_flg) return false;
      _loadeddata_flg = true;
      this.SetVolume(this.CONFIG.volume);
      this._setInfo();
      this._setPoster();
      this.Update();
      if(_that.on.PlayerInit && typeof(_that.on.PlayerInit) === 'function') _that.on.PlayerInit(_that, _that.Player);
    });

    // For Timeupdate.
    this.Player.on('timeupdate', ()=>{
      this.Update();
    });

    // For Volume change.
    this.Player.on('volumechange', ()=>{
      // 音量バーの更新(％)
      let _volume = this.Player.volume();

      DOM.setStyle( this.$.uiSeekbarVolCover, { width : (_volume * 100) + '%' } );

      if(_that.on.VolumeChange && typeof(_that.on.VolumeChange) === 'function'){
        _that.on.VolumeChange({
          volume: PLAYER_MODULE_BRIGHTCOVE.toFixedNumber(_volume, 3),
          par   : PLAYER_MODULE_BRIGHTCOVE.toFixedNumber(_volume * 100, 1)
        });
      }
    });

    // For Ended movie paly.
    this.Player.on('ended', ()=>{
      this.Stop();
      if(_that.on.PlayerEnded && typeof(_that.on.PlayerEnded) === 'function') _that.on.PlayerEnded(_that, _that.Player);
    });

    this.Player.on('play', ()=>{
      this.ClassOn();
      if(_that.on.PlayerPlay && typeof(_that.on.PlayerPlay) === 'function') _that.on.PlayerPlay(_that, _that.Player);
    });

    this.Player.on('pause', ()=>{
      this.ClassOff();
      if(_that.on.PlayerPause && typeof(_that.on.PlayerPause) === 'function') _that.on.PlayerPause(_that, _that.Player);
    });

    // For Error
    this.Player.on( 'error' , (err: any)=>{
      console.log(err);
    });
  }

  AddGlobalObject(){
    // Add player instance at global object.
    // -> window.PLAYER_MODULE_ALL_PLATLIST

    if(window.PLAYER_MODULE_ALL_PLATLIST === undefined){
      window.PLAYER_MODULE_ALL_PLATLIST = [];
      window.PLAYER_MODULE_ALL_PLATLIST.push({
        instance: this,
        Player: this.Player,
        videoid: this.CONFIG.videoid,
        id: this.CONFIG.id,
        player_id: this.CONFIG.player_id
      });
    }else{
      window.PLAYER_MODULE_ALL_PLATLIST.push({
        instance: this,
        Player: this.Player,
        videoid: this.CONFIG.videoid,
        id: this.CONFIG.id,
        player_id: this.CONFIG.player_id
      });
    }
  }

  CacheElement(){
    this.$.playerElem                 = DOM.selectDom(`#${this.CONFIG.id}`);
    this.$.playerElemMain             = DOM.selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_id}`);
    this.$.playerElemMainWrap         = DOM.selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_id_wrap}`);

    this.$.uiBtnPlay                  = DOM.selectDom('#'+this.CONFIG.id+' .ui-btn-play');
    this.$.uiBtnStop                  = DOM.selectDom('#'+this.CONFIG.id+' .ui-btn-stop');
    this.$.uiBtnPause                 = DOM.selectDom('#'+this.CONFIG.id+' .ui-btn-pause');
    this.$.uiBtnMute                  = DOM.selectDom('#'+this.CONFIG.id+' .ui-btn-mute');
    this.$.uiBtnVolon                 = DOM.selectDom('#'+this.CONFIG.id+' .ui-btn-volon');
    this.$.uiBtnVoloff                = DOM.selectDom('#'+this.CONFIG.id+' .ui-btn-voloff');

    this.$.uiDisplayTime              = DOM.selectDom('#'+this.CONFIG.id+' .ui-time');
    this.$.uiDisplayTimeNow           = DOM.selectDom('#'+this.CONFIG.id+' .ui-time-now');
    this.$.uiDisplayTimeTotal         = DOM.selectDom('#'+this.CONFIG.id+' .ui-time-total');
    this.$.uiDisplayTimeDown          = DOM.selectDom('#'+this.CONFIG.id+' .ui-time-down');
    this.$.uiDisplayTimePar           = DOM.selectDom('#'+this.CONFIG.id+' .ui-time-par');
    this.$.uiDisplayPoster            = DOM.selectDom('#'+this.CONFIG.id+' .ui-poster');
    this.$.uiDisplayPosterBg          = DOM.selectDom('#'+this.CONFIG.id+' .ui-poster-background');
    this.$.uiDisplayName              = DOM.selectDom('#'+this.CONFIG.id+' .ui-name');

    this.$.uiSeekbarVol               = DOM.selectDom('#'+this.CONFIG.id+' .ui-seekbar-vol');
    this.$.uiSeekbarVolBg             = DOM.selectDom('#'+this.CONFIG.id+' .ui-seekbar-vol .ui-seekbar-vol-bg');
    this.$.uiSeekbarVolCover          = DOM.selectDom('#'+this.CONFIG.id+' .ui-seekbar-vol span');
    this.$.uiSeekbarTime              = DOM.selectDom('#'+this.CONFIG.id+' .ui-seekbar-time');
    this.$.uiSeekbarTimeBg            = DOM.selectDom('#'+this.CONFIG.id+' .ui-seekbar-time .ui-seekbar-time-bg');
    this.$.uiSeekbarTimeCover         = DOM.selectDom('#'+this.CONFIG.id+' .ui-seekbar-time span');

    this.$.uiBtnChange                = DOM.selectDom('#'+this.CONFIG.id+' .ui-btn-change');

    this.$.uiBtnDataId                = DOM.selectDom('[data-PMB-id]');
  }

  EventPlay(){
    if(this.$.uiBtnPlay){
      DOM.addEvent(this.$.uiBtnPlay, 'click' , () => {
        if(this.Player.paused()){
          this.Play();
        } else {
          this.Pause();
        }
      });
    }
  }

  EventPause(){
    if(this.$.uiBtnPause){
      DOM.addEvent(this.$.uiBtnPause, 'click' , () => {
        this.Pause();
      });
    }
  }

  EventStop(){
    if(this.$.uiBtnStop){
      DOM.addEvent(this.$.uiBtnStop, 'click' , () => {
        this.Stop();
      });
    }

    DOM.addEvent(window, 'blur' , () => {
      if(this.CONFIG.stop_outfocus) this.Stop();
    });
  }

  EventMute(){
    if(this.$.uiBtnMute){
      DOM.addEvent(this.$.uiBtnMute, 'click' , () => {
        this.Mute();
      });
    }
  }

  EventVolon(){
    if(this.$.uiBtnVolon){
      DOM.addEvent(this.$.uiBtnVolon, 'click' , () => {
        this.SetVolume(this.CONFIG.volume);
        DOM.removeClass(this.$.uiBtnVolon, this.CONFIG.classname_active);
      });
    }
  }

  EventVoloff(){
    if(this.$.uiBtnVoloff){
      DOM.addEvent(this.$.uiBtnVoloff, 'click' , () => {
        this.SetVolume('off');
        DOM.addClass(this.$.uiBtnVoloff, this.CONFIG.classname_active);
      });
    }
  }

  /**
   * When dragging a seek bar(volume).
   */
  EventSeekbarVol(){
    if(this.$.uiSeekbarVol){

      let _flag = false;
      let _targetWidth = 0;

      DOM.setStyle( this.$.uiSeekbarVolCover, { width : 100 + '%' } );

      DOM.addEvent(this.$.uiSeekbarVol, 'mousedown' , (event: MouseEvent) => {
        _flag = true;
        let _target  = event.currentTarget as HTMLElement;
        let _currentWidth  = _target.clientWidth;
        let _clickPosition = _target.getBoundingClientRect().left;
        _targetWidth       = (event.pageX - _clickPosition) / _currentWidth;
        this.SetVolume(_targetWidth);
      });

      DOM.addEvent(this.$.uiSeekbarVol, 'mouseleave' , () => {
        _flag = false;
      });
      DOM.addEvent(this.$.uiSeekbarVol, 'mouseup' , () => {
        _flag = false;
      });

      DOM.addEvent(this.$.uiSeekbarVol, 'mousemove' , (event: MouseEvent) => {
        if(_flag === true){
          let _target  = event.currentTarget as HTMLElement;
          let _currentWidth  = _target.clientWidth;
          let _clickPosition = _target.getBoundingClientRect().left;
          _targetWidth       = (event.pageX - _clickPosition) / _currentWidth;
          if(this.Player.muted()){
            this.Player.muted(false);
          }
          this.SetVolume(_targetWidth);
        }
      });
    }
  }

  /**
   * When dragging a seek bar(time).
   */
  EventSeekbarTime(){

    if(this.$.uiSeekbarTime){

      let _targetTime = 0;

      DOM.addEvent(this.$.uiSeekbarTime, 'mousedown', (event: MouseEvent) => {
        this.PlayerChangeSeekingFlg = true;
        let _target        = event.currentTarget as HTMLElement;
        let _currentWidth  = _target.clientWidth;
        let _clickPosition = _target.getBoundingClientRect().left;
        let _targetWidth   = (event.pageX - _clickPosition) / _currentWidth;
        _targetTime = this.Player.duration() * _targetWidth;
        DOM.setStyle( this.$.uiSeekbarTimeCover, { width : (_targetWidth * 100) + '%' } );
        this.Player.currentTime(_targetTime);
      });

      DOM.addEvent(this.$.uiSeekbarTime, 'mouseleave', () => {
        if(this.PlayerChangeSeekingFlg){
          this.Play();
          setTimeout(()=>{
            this.Play();
            this.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      DOM.addEvent(this.$.uiSeekbarTime, 'mouseup', () => {
        if(this.PlayerChangeSeekingFlg){
          this.Play();
          setTimeout(()=>{
            this.Play();
            this.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      DOM.addEvent(this.$.uiSeekbarTime, 'mousemove', (event: MouseEvent) => {
        if(this.PlayerChangeSeekingFlg){
          let _target        = event.currentTarget as HTMLElement;
          let _currentWidth  = _target.clientWidth;
          let _clickPosition = _target.getBoundingClientRect().left;
          let _targetWidth   = (event.pageX - _clickPosition) / _currentWidth;
          _targetTime    = this.Player.duration() * _targetWidth;

          DOM.setStyle( this.$.uiSeekbarTimeCover, { width : (_targetWidth * 100) + '%' } );
          this.Player.currentTime(_targetTime);
        }
      });

    }
  }

  EventChangeVideo(){
    if(this.$.uiBtnChange){
      DOM.addEvent(this.$.uiBtnChange, 'click' , (event: MouseEvent) => {
        // Get video-id.
        // -> <data-PMB-id="">
        let _target = event.currentTarget as HTMLElement;
        let id = _target.dataset.pmbId;
        this.Change(id);
      });
    }
  }

  ClassOn(){
    // Add className Player wrapper.
    if(this.$.playerElem) DOM.addClass(this.$.playerElem, this.CONFIG.classname_active_wrap);

    // Add className Play-Button.
    if(this.$.uiBtnPlay) DOM.addClass(this.$.uiBtnPlay, this.CONFIG.classname_active);

    // Add className Pause-Button.
    if(this.$.uiBtnPause) DOM.addClass(this.$.uiBtnPause, this.CONFIG.classname_active);

    // Add className MediaChange-Button.
    if(this.$.uiBtnDataId){
      this.$.uiBtnDataId.map((item)=>{
        if(this.CONFIG.videoid == item.getAttribute('data-PMB-id')){
          DOM.addClass(item, this.CONFIG.classname_active);
        }
      });
    }
  }

  ClassOff(){
    // Remove className Player wrapper.
    if(this.$.playerElem) DOM.removeClass(this.$.playerElem, this.CONFIG.classname_active_wrap);

    // Remove className Play-Button.
    if(this.$.uiBtnPlay) DOM.removeClass(this.$.uiBtnPlay, this.CONFIG.classname_active);

    // Remove className Pause-Button.
    if(this.$.uiBtnPause) DOM.removeClass(this.$.uiBtnPause, this.CONFIG.classname_active);

    // Remove className MediaChange-Button.
    if(this.$.uiBtnDataId) DOM.removeClass(this.$.uiBtnDataId, this.CONFIG.classname_active);
  }

  Update(){

    // Not change value at seeking.
    if(this.PlayerChangeSeekingFlg) return;

    // Determine while changing media.
    if(this.PlayerChangeLoadFlg){
      // update player data. (ms)
      if(this.$.uiDisplayTime) DOM.setHtml( this.$.uiDisplayTime, this.GetTime()+'/'+this.GetTimeMax() );
      if(this.$.uiDisplayTimeNow) DOM.setHtml( this.$.uiDisplayTimeNow, this.GetTime() );
      if(this.$.uiDisplayTimeDown) DOM.setHtml( this.$.uiDisplayTimeDown, this.GetTimeDown() );
      if(this.$.uiDisplayTimeTotal) DOM.setHtml( this.$.uiDisplayTimeTotal, this.GetTimeMax() );

      // update play time. (%)
      if(this.$.uiDisplayTimePar) DOM.setHtml( this.$.uiDisplayTimePar, this.GetTimePar() );

      // update seek-bar. (%)
      if(this.$.uiSeekbarTimeCover) this.$.uiSeekbarTimeCover[0].style.width = this.GetTimePar();

      if(this.on.TimeUpdate && typeof(this.on.TimeUpdate) === 'function'){
        this.on.TimeUpdate({
          current : this.GetTime(),
          max     : this.GetTimeMax(),
          down    : this.GetTimeDown(),
          ratio   : this.GetTimeRatio(),
          par     : this.GetTimePar()
        });
      }
    } else {
      // update player data. (ms)
      if(this.$.uiDisplayTime) DOM.setHtml( this.$.uiDisplayTime, '00:00/00:00' );
      if(this.$.uiDisplayTimeNow) DOM.setHtml( this.$.uiDisplayTimeNow, '00:00' );
      if(this.$.uiDisplayTimeDown) DOM.setHtml( this.$.uiDisplayTimeDown, '00:00' );
      if(this.$.uiDisplayTimeTotal) DOM.setHtml( this.$.uiDisplayTimeTotal, '00:00' );

      // update play time. (%)
      if(this.$.uiDisplayTimePar) DOM.setHtml( this.$.uiDisplayTimePar, '0%' );

      // update seek-bar. (%)
      if(this.$.uiSeekbarTimeCover) this.$.uiSeekbarTimeCover[0].style.width = '0%';
    }

  }

  Play(callback?: ()=>{}){
    if(this.$.uiBtnPlay || this.$.uiBtnDataId){
      if(this.Player.paused()){
        if(!this.on.PlayPrep && callback) this.on.PlayPrep = callback;
        if(this.on.PlayPrep && typeof(this.on.PlayPrep) === 'function') this.on.PlayPrep(this, this.Player);

        // When the player is stopped.
        this.Player.play();
        this.ClassOn();

        if(!this.on.Play && callback) this.on.Play = callback;
        if(this.on.Play && typeof(this.on.Play) === 'function') this.on.Play(this, this.Player);
      } else {
        // When the player is playing.
        this.Pause();
        this.ClassOff();
      }
    }
  }

  Stop(callback?: ()=>{}){
    this.Player.pause();
    this.Player.currentTime(0);
    this.ClassOff();

    if(!this.on.Stop && callback) this.on.Stop = callback;
    if(this.on.Stop && typeof(this.on.Stop) === 'function') this.on.Stop(this, this.Player);
  }

  Pause(callback?: ()=>{}){
    this.Player.pause();
    this.ClassOff();

    if(!this.on.Pause && callback) this.on.Pause = callback;
    if(this.on.Pause && typeof(this.on.Pause) === 'function') this.on.Pause(this, this.Player);
  }

  Mute(){
    if(this.Player.muted()){
      this.Player.muted(false);
      this.SetVolume(this.CONFIG.volume);
      DOM.removeClass(this.$.uiBtnMute, this.CONFIG.classname_active);
    }else{
      this.Player.muted(true);
      this.Player.volume(0);
      DOM.addClass(this.$.uiBtnMute, this.CONFIG.classname_active);
    }
  }

  /**
   * When Media change.
   *
   * id       | str      | media-id.
   * callback | function | callback function after changed.
   */
  Change(id: any, callback?: ()=>{}){

    // 動画IDが取得出来ない場合は処理を中止
    if(id == '' || id == null || id == undefined) return;

    // Check if it is the same media.
    if(this.CONFIG.videoid !== id){

      this.PlayerChangeLoadFlg = false;

      // Overwrite video id.
      this.CONFIG.videoid = id;

      // Reset playback position once in click event propagation.
      // exclud IE, Edge, for there is a bugs
      let _ua = window.navigator.userAgent.toLowerCase();
      if(_ua.indexOf('msie') == -1 && _ua.indexOf('trident') == -1 && _ua.indexOf('edge') == -1) {
        this.Player.currentTime(0);
      }

      // Run playback start processing once in the click event propagation.
      // this.Player.muted(true);
      this.Player.play();

      this.Player.catalog.getVideo(id, (error: any, video: any) => {

        // reload palyer data.
        this.Player.catalog.load(video);

        // Set MediaInfo
        this._setInfo();
        this._setPoster();

        // replay after data change.
        setTimeout( () => {
          this.Player.play();
          // this.Player.muted(false);
          this.ClassOff();
          this.ClassOn();
        }, 100);

        setTimeout( () => {
          this.PlayerChangeLoadFlg = true;

          if(!this.on.Change && callback) this.on.Change = callback;
          if(this.on.Change && typeof(this.on.Change) === 'function') this.on.Change(this, this.Player);
        }, 300);

      });

      // Determine if the next media information could be obtained.
      this.Player.on('loadeddata',() => {
        this.PlayerChangeLoadFlg = true;
        this.Player.off('loadeddata');
      });


    } else {
      this.Play();

      if(!this.on.Change && callback) this.on.Change = callback;
      if(this.on.Change && typeof(this.on.Change) === 'function') this.on.Change(this, this.Player);

    }

  }

  PauseAll(callback?: ()=>{}){
    window.PLAYER_MODULE_ALL_PLATLIST.map((item: any)=>{
      item.instance.Pause();
    });

    if(!this.on.PauseAll && callback) this.on.PauseAll = callback;
    if(this.on.PauseAll && typeof(this.on.PauseAll) === 'function') this.on.PauseAll(this, this.Player);
  }

  StopAll(callback?: ()=>{}){
    window.PLAYER_MODULE_ALL_PLATLIST.map((item: any)=>{
      item.instance.Stop();
    });

    if(!this.on.StopAll && callback) this.on.StopAll = callback;
    if(this.on.StopAll && typeof(this.on.StopAll) === 'function') this.on.StopAll(this, this.Player);
  }

  SeekTo(sec: any){
    if(!sec) return false;
    if(typeof sec == 'object' || typeof sec == 'function') return false;
    if(typeof sec == 'string') sec = Number(sec);
    if(!sec) return false;
    this.Player.currentTime(sec);
  }

  GetTime(){
    let _m = PLAYER_MODULE_BRIGHTCOVE.parseNumber(Math.floor(this.Player.currentTime()/60));
    let _s = PLAYER_MODULE_BRIGHTCOVE.parseNumber(Math.floor(this.Player.currentTime()%60));
    // @ts-ignore
    if(isFinite(_s) && isFinite(_m)) return _m+':'+_s;
    else return '00:00';
  }

  GetTimeDown(){
    let _countDownTime = this.Player.duration() - this.Player.currentTime();
    let _m_down        = PLAYER_MODULE_BRIGHTCOVE.parseNumber(Math.floor(_countDownTime / 60));
    let _s_down        = PLAYER_MODULE_BRIGHTCOVE.parseNumber(Math.floor(_countDownTime % 60));
    // @ts-ignore
    if(isFinite(_s_down) && isFinite(_m_down)) return _m_down+':'+_s_down;
    else return '00:00';
  }

  GetTimeMax(){
    let _m_max = PLAYER_MODULE_BRIGHTCOVE.parseNumber(Math.floor(this.Player.duration()/60));
    let _s_max = PLAYER_MODULE_BRIGHTCOVE.parseNumber(Math.floor(this.Player.duration()%60));
    return _m_max+':'+_s_max;
  }

  GetTimeRatio(){
    return Math.floor(this.Player.currentTime() / this.Player.duration() * 1000) / 1000;
  }

  GetTimePar(){
    let _time = Math.floor(this.Player.currentTime() / this.Player.duration() * 1000) / 10;
    if(isFinite(_time)) return _time + '%';
    else return '0%';
  }

  GetPoster(){
    return this.Player.poster();
  }

  GetMediaInfo(){
    return this.Player.mediainfo;
  }

  SetVolume(vol?: number | 'off'){

    if(vol === 'off'){
      this.Player.volume(0);
    }
    if(typeof vol === 'number'){
      if(Number(vol) < 0 && 1 < Number(vol)) return false;
      this.CONFIG.volume = Number(vol);
      this.Player.volume(this.CONFIG.volume);
    }
  }

  Destroy(){
    this.Player.reset();
  }

  private _setPoster(path?: string){
    if(path){
      this.Player.poster(path);
    } else {
      if(this.CONFIG.poster != false) this.state.poster = this.GetPoster();

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
    if(typeof(num) === 'number') num = String(num);
    if (Number(num) < 10) return '0'+num;
    if (Number(num) >= 10) return num;
  }

  static pad(n: number|string, width: number, z: string): string {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  static toFixedNumber(num: number|string, digits: number, base?: number) {
    var pow = Math.pow(base||10, digits);
    return Math.round(Number(num) * pow) / pow;
  }

}
