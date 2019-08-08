/*!
 * JS PLAYER MODULE BRIGHTCOVE (JavaScript Library)
 *   js-player-module-brightcove.js
 * Version 3.0.1
 * Repository https://github.com/yama-dev/js-player-module-brightcove
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

import {PARSE_MODULE} from 'js-parse-module';

import { viewPlayerScriptcode, viewPlayerMain, viewPlayerUi, viewPlayerStyle } from './view.js';

import JS_DOM from '@yama-dev/js-dom';
const dom = new JS_DOM();

export default class PLAYER_MODULE_BRIGHTCOVE {

  constructor(options = {}){

    // Set Version.
    this.VERSION = '3.0.1';

    // Set Flgs.
    this.PlayerChangeLoadFlg = true;

    if(!options.id || !options.videoid){
      console.log('Inadequate parameters (id, videoid)');
      return false;
    }

    // Set config, options.
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
      poster         : options.poster||null,

      add_style        : options.add_style||''
    }

    // Set config, callback functions.
    if(!options.on){
      options.on = {}
    }
    this.on = {
      PlayPrep: options.on.PlayPrep||'',
      Play    : options.on.Play||'',
      Pause   : options.on.Pause||'',
      Stop    : options.on.Stop||'',
      PauseAll: options.on.PauseAll||'',
      StopAll : options.on.StopAll||'',
      Change  : options.on.Change||''
    }

    // BrightcovePlayer MediaInfo
    this.PlayerMediaInfo = {};

    // BrightcovePlayer Instance.
    this.Player = '';

    // Player wrapper.
    this.$playerElem = dom.selectDom(`#${this.CONFIG.id}`);

    // Import Views.
    this.playerHtml       = viewPlayerMain;
    this.playerUiHtml     = viewPlayerUi;
    this.playerCss        = viewPlayerStyle;
    this.playerCssOption  = '';
    this.playerScriptCode = viewPlayerScriptcode;

    // Check Audio mode.
    if(this.CONFIG.mode == 'audio'){
      this.CONFIG.width  = 1;
      this.CONFIG.height = 1;
    }

    // Set Options
    // -> playerHtml
    // -> playerCss
    // -> playerScriptCode
    this.playerHtml        = PARSE_MODULE.Str2Mustache(this.playerHtml, this.CONFIG);
    this.playerCss         = PARSE_MODULE.Str2Mustache(this.playerCss, this.CONFIG);
    this.playerScriptCode  = PARSE_MODULE.Str2Mustache(this.playerScriptCode, this.CONFIG);

    // Check Audio mode.
    if(this.CONFIG.mode == 'audio'){
      this.playerCssOption += `#${this.CONFIG.player_id} { opacity: 0; }`;
    }

    // Check Add Style.
    if(this.CONFIG.add_style){
      this.playerCssOption += this.CONFIG.add_style;
    }

    // SetPlayer
    if(document.readyState == 'complete'){
      this.BuildPlayer();
    } else {
      document.addEventListener('DOMContentLoaded', (event) => {
        this.BuildPlayer();
      });
    }

  }

  BuildPlayer(){
    // Player Ui.
    let playerUiHtmlDom       = document.createElement('div');
    playerUiHtmlDom.innerHTML = this.playerUiHtml;
    if(this.CONFIG.ui_default){
      this.$playerElem[0].insertBefore(playerUiHtmlDom, this.$playerElem[0].firstElementChild);
    }

    // Player Main.
    let playerHtmlDom         = document.createElement('div');
    let playerHtmlDomWrap = document.createElement('div');
    playerHtmlDom.id  = this.CONFIG.player_id;
    playerHtmlDomWrap.id  = this.CONFIG.player_id_wrap;
    playerHtmlDom.innerHTML   = this.playerHtml;
    playerHtmlDomWrap.appendChild(playerHtmlDom);
    this.$playerElem[0].insertBefore(playerHtmlDomWrap, this.$playerElem[0].firstElementChild);

    // Player Style.
    let playerCssDom          = document.createElement('style');
    playerCssDom.innerHTML    = this.playerCss;
    playerCssDom.id           = this.CONFIG.id+'_scripttag';
    if(this.CONFIG.ui_default_css){
      playerCssDom.innerHTML = this.playerCss;
      playerCssDom.innerHTML += this.playerCssOption;
      if(!dom.selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_style_id}`)){
        this.$playerElem[0].appendChild(playerCssDom);
      }
    } else {
      playerCssDom.innerHTML = this.playerCssOption;
      if(!dom.selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_style_id}`)){
        this.$playerElem[0].appendChild(playerCssDom);
      }
    }

    // CacheElement
    this.CacheElement();

    // Set ScriptTag
    let s = document.createElement('script');
    s.id  = `${this.CONFIG.id}_scripttag`;
    s.src = this.playerScriptCode;
    document.body.appendChild(s);

    s.onload = this.PlayerInstance();
  }

  PlayerInstance(){
    let _that = this;

    let checkPlayerTest = ()=>{

      // Set Instance
      this.Player = videojs(this.CONFIG.player_id);

      // Set PlayerJson
      this.PlayerJson = this.Player.toJSON();

      // Set MediaInfo
      this.PlayerMediaInfo = this.Player.mediainfo;

      this.SetVolume();
      this.SetInfo();
      this.SetPoster();

      this.EventPlay();
      this.EventPause();
      this.EventStop();
      this.EventMute();
      this.EventVolon();
      this.EventVoloff();
      this.EventBtnFull();
      this.EventSeekbarVol();
      this.EventSeekbarTime();
      this.EventChangeVideo();

      this.AddGlobalObject();

      // For Timeupdate.
      videojs(this.CONFIG.player_id).on('timeupdate', ()=>{
        this.Update();
      });

      // For Volume change.
      videojs(this.CONFIG.player_id).on('volumechange', ()=>{
        // 音量バーの更新(％)
        dom.setStyle( this.$uiSeekbarVolCover, { width : (this.Player.volume() * 100) + '%' } );
      });

      // For Ended movie paly.
      videojs(this.CONFIG.player_id).on('ended', ()=>{
        this.Stop();
      });

      // For Error
      videojs(this.CONFIG.player_id).on( 'error' , (err)=>{
        console.log(this.error().code);
      });
    };

    // Check Player try loaded.
    let checkPlayerFlg        = false;
    let checkPlayerCount      = 0;
    let checkPlayerLimitCount = 100;
    let checkPlayer = setInterval(()=>{
      try {
        videojs(this.CONFIG.player_id).mediainfo.name;
        if(videojs(this.CONFIG.player_id).mediainfo.name){
          checkPlayerFlg = true;
        }
      } catch (e) {
        checkPlayerFlg = false;
        // console.log(e.name, e.message);
      }
      // Check upper limit of action to try.
      if(checkPlayerCount >= checkPlayerLimitCount){
        clearInterval(checkPlayer);
        console.log('ERROR: not movie loaded.');
      } else {
        if(checkPlayerFlg){
          clearInterval(checkPlayer);
          checkPlayerTest();
        }
      }
      checkPlayerCount++;
    }, 100);

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
    this.$playerElem                 = dom.selectDom(`#${this.CONFIG.id}`);
    this.$playerElemMain             = dom.selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_id}`);
    this.$playerElemMainWrap         = dom.selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_id_wrap}`);

    this.$uiBtnPlay                  = dom.selectDom('#'+this.CONFIG.id+' .btn_play');
    this.$uiBtnStop                  = dom.selectDom('#'+this.CONFIG.id+' .btn_stop');
    this.$uiBtnPause                 = dom.selectDom('#'+this.CONFIG.id+' .btn_pause');
    this.$uiBtnMute                  = dom.selectDom('#'+this.CONFIG.id+' .btn_mute');
    this.$uiBtnVolon                 = dom.selectDom('#'+this.CONFIG.id+' .btn_volon');
    this.$uiBtnVoloff                = dom.selectDom('#'+this.CONFIG.id+' .btn_voloff');
    this.$uiBtnFull                  = dom.selectDom('#'+this.CONFIG.id+' .btn_full');

    this.$uiDisplayTime              = dom.selectDom('#'+this.CONFIG.id+' .display_time');
    this.$uiDisplayTimeNow           = dom.selectDom('#'+this.CONFIG.id+' .display_time_now');
    this.$uiDisplayTimeTotal         = dom.selectDom('#'+this.CONFIG.id+' .display_time_total');
    this.$uiDisplayTimeDown          = dom.selectDom('#'+this.CONFIG.id+' .display_time_down');
    this.$uiDisplayTimePar           = dom.selectDom('#'+this.CONFIG.id+' .display_time_par');
    this.$uiDisplayPoster            = dom.selectDom('#'+this.CONFIG.id+' .display_poster');
    this.$uiDisplayPosterBg          = dom.selectDom('#'+this.CONFIG.id+' .display_poster_background');
    this.$uiDisplayName              = dom.selectDom('#'+this.CONFIG.id+' .display_name');

    this.$uiSeekbarVol               = dom.selectDom('#'+this.CONFIG.id+' .seekbar_vol');
    this.$uiSeekbarVolBg             = dom.selectDom('#'+this.CONFIG.id+' .seekbar_vol .seekbar_vol_bg');
    this.$uiSeekbarVolCover          = dom.selectDom('#'+this.CONFIG.id+' .seekbar_vol span');
    this.$uiSeekbarTime              = dom.selectDom('#'+this.CONFIG.id+' .seekbar_time');
    this.$uiSeekbarTimeBg            = dom.selectDom('#'+this.CONFIG.id+' .seekbar_time .seekbar_time_bg');
    this.$uiSeekbarTimeCover         = dom.selectDom('#'+this.CONFIG.id+' .seekbar_time span');

    this.$uiBtnChange                = dom.selectDom('#'+this.CONFIG.id+' .btn_change');
    this.$uiBtnChangeDisplayTime     = dom.selectDom('#'+this.CONFIG.id+' .display_time');
    this.$uiBtnChangeDisplayTimeDown = dom.selectDom('#'+this.CONFIG.id+' .display_time_down');

    this.$uiBtnDataId                = dom.selectDom('[data-PMB-id]');
  }

  EventPlay(){
    if(this.$uiBtnPlay){
      dom.addEvent(this.$uiBtnPlay, 'click' , (event) => {
        if(this.Player.paused()){
          this.Play();
        } else {
          this.Pause();
        }
      });
    }
  }

  EventPause(){
    if(this.$uiBtnPause){
      dom.addEvent(this.$uiBtnPause, 'click' , (event) => {
        this.Pause();
      });
    }
  }

  EventStop(){
    if(this.$uiBtnStop){
      dom.addEvent(this.$uiBtnStop, 'click' , (event) => {
        this.Stop();
      });
    }

    dom.addEvent(window, 'blur' , (event) => {
      if(this.CONFIG.stop_outfocus) this.Stop();
    });
  }

  EventMute(){
    if(this.$uiBtnMute){
      dom.addEvent(this.$uiBtnMute, 'click' , (event) => {
        this.Mute();
      });
    }
  }

  EventVolon(){
    if(this.$uiBtnVolon){
      dom.addEvent(this.$uiBtnVolon, 'click' , (event) => {
        this.SetVolume(this.CONFIG.volume);
        dom.removeClass(this.$uiBtnVolon, 'active');
      });
    }
  }

  EventVoloff(){
    if(this.$uiBtnVoloff){
      dom.addEvent(this.$uiBtnVoloff, 'click' , (event) => {
        this.SetVolume(0);
        dom.addClass(this.$uiBtnVoloff, 'active');
      });
    }
  }

  /**
   * When dragging a seek bar(volume).
   */
  EventSeekbarVol(){
    if(this.$uiSeekbarVol){

      let _flag = false;
      let _targetWidth = 0;

      dom.setStyle( this.$uiSeekbarVolCover, { width : 100 + '%' } );

      dom.addEvent(this.$uiSeekbarVol, 'mousedown' , (event) => {
        _flag = true;
        let _currentWidth  = event.currentTarget.clientWidth;
        let _clickPosition = event.currentTarget.getBoundingClientRect().left;
        _targetWidth       = (event.pageX - _clickPosition) / _currentWidth;
        this.SetVolume(_targetWidth);
      });

      dom.addEvent(this.$uiSeekbarVol, 'mouseleave' , (event) => {
        _flag = false;
      });
      dom.addEvent(this.$uiSeekbarVol, 'mouseup' , (event) => {
        _flag = false;
      });

      dom.addEvent(this.$uiSeekbarVol, 'mousemove' , (event) => {
        if(_flag === true){
          let _currentWidth  = event.currentTarget.clientWidth;
          let _clickPosition = event.currentTarget.getBoundingClientRect().left;
          _targetWidth       = (event.pageX - _clickPosition) / _currentWidth;
          if(this.Player.muted()){
            this.CONFIG.muted = false;
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

    if(this.$uiSeekbarTime){

      let _targetTime = 0;

      dom.addEvent(this.$uiSeekbarTime, 'mousedown', (event) => {
        this.PlayerChangeSeekingFlg = true;
        let _currentWidth    = event.currentTarget.clientWidth;
        let _clickPosition  = event.currentTarget.getBoundingClientRect().left;
        let _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
        _targetTime = this.Player.duration() * _targetWidth;
        dom.setStyle( this.$uiSeekbarTimeCover, { width : (_targetWidth * 100) + '%' } );
        this.Player.currentTime(_targetTime);
      });

      dom.addEvent(this.$uiSeekbarTime, 'mouseleave', (event) => {
        if(this.PlayerChangeSeekingFlg){
          this.Play();
          setTimeout(()=>{
            this.Play();
            this.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      dom.addEvent(this.$uiSeekbarTime, 'mouseup', (event) => {
        if(this.PlayerChangeSeekingFlg){
          this.Play();
          setTimeout(()=>{
            this.Play();
            this.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      dom.addEvent(this.$uiSeekbarTime, 'mousemove', (event) => {
        if(this.PlayerChangeSeekingFlg){
          let _currentWidth    = event.currentTarget.clientWidth;
          let _clickPosition  = event.currentTarget.getBoundingClientRect().left;
          let _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
          let _targetTime = this.Player.duration() * _targetWidth;
          dom.setStyle( this.$uiSeekbarTimeCover, { width : (_targetWidth * 100) + '%' } );
          this.Player.currentTime(_targetTime);
        }
      });

    }
  }

  EventChangeVideo(){
    if(this.$uiBtnChange){
      dom.addEvent(this.$uiBtnChange, 'click' , (event) => {
        // Get video-id.
        // -> <data-PMB-id="">
        let id = event.currentTarget.dataset.pmbId;
        this.Change(id);
      });
    }
  }

  EventBtnFull(){
    if(this.$uiBtnFull){
      dom.addEvent(this.$uiBtnFull, 'click' , (event) => {
        this.Fullscreen();
      });
    }
  }

  ClassOn(){
    // Add className Play-Button.
    if(this.$uiBtnPlay) dom.addClass(this.$uiBtnPlay, 'active');

    // Add className Pause-Button.
    if(this.$uiBtnPause) dom.addClass(this.$uiBtnPause, 'active');

    // Add className MediaChange-Button.
    if(this.$uiBtnDataId){
      this.$uiBtnDataId.map((item,index)=>{
        if(this.CONFIG.videoid == item.getAttribute('data-PMB-id')){
          dom.addClass(item, 'active');
        }
      });
    }
  }

  ClassOff(){
    // Add className Play-Button.
    if(this.$uiBtnPlay) dom.removeClass(this.$uiBtnPlay, 'active');

    // Add className Pause-Button.
    if(this.$uiBtnPause) dom.removeClass(this.$uiBtnPause, 'active');

    // Remove className MediaChange-Button.
    if(this.$uiBtnDataId) dom.removeClass(this.$uiBtnDataId, 'active');
  }

  Update(){

    // Not change value at seeking.
    if(this.PlayerChangeSeekingFlg) return

    // Determine while changing media.
    if(this.PlayerChangeLoadFlg){
      // update player data. (ms)
      if(this.$uiDisplayTime) dom.setHtml( this.$uiDisplayTime, this.GetTime()+'/'+this.GetTimeMax() );
      if(this.$uiDisplayTimeNow) dom.setHtml( this.$uiDisplayTimeNow, this.GetTime() );
      if(this.$uiDisplayTimeTotal) dom.setHtml( this.$uiDisplayTimeTotal, this.GetTimeMax() );
      if(this.$uiDisplayTimeDown) dom.setHtml( this.$uiDisplayTimeDown, this.GetTimeDown() );
      if(this.$uiBtnChangeDisplayTime) dom.setHtml( this.$uiBtnChangeDisplayTime, this.GetTime()+'/'+this.GetTimeMax() );
      if(this.$uiBtnChangeDisplayTimeDown) dom.setHtml( this.$uiBtnChangeDisplayTimeDown, this.GetTimeDown() );

      // update play time. (%)
      if(this.$uiDisplayTimePar) dom.setHtml( this.$uiDisplayTimePar, this.GetTimePar() );

      // update seek-bar. (%)
      if(this.$uiSeekbarTimeCover) this.$uiSeekbarTimeCover[0].style.width = this.GetTimePar();
    } else {
      // update player data. (ms)
      if(this.$uiDisplayTime) dom.setHtml( this.$uiDisplayTime, '00:00' );
      if(this.$uiDisplayTimeNow) dom.setHtml( this.$uiDisplayTimeNow, '00:00' );
      if(this.$uiDisplayTimeTotal) dom.setHtml( this.$uiDisplayTimeTotal, '00:00' );
      if(this.$uiDisplayTimeDown) dom.setHtml( this.$uiDisplayTimeDown, '00:00' );
      if(this.$uiBtnChangeDisplayTime) dom.setHtml( this.$uiBtnChangeDisplayTime, '00:00' );
      if(this.$uiBtnChangeDisplayTimeDown) dom.setHtml( this.$uiBtnChangeDisplayTimeDown, '00:00' );

      // update play time. (%)
      if(this.$uiDisplayTimePar) dom.setHtml( this.$uiDisplayTimePar, '0%' );

      // update seek-bar. (%)
      if(this.$uiSeekbarTimeCover) this.$uiSeekbarTimeCover[0].style.width = '0%';
    }

  }

  Play(callback){
    if(this.$uiBtnPlay || this.$uiBtnDataId){
      if(this.Player.paused()){
        if(!this.on.PlayPrep && callback) this.on.PlayPrep = callback;
        if(this.on.PlayPrep && typeof(this.on.PlayPrep) === 'function') this.on.PlayPrep(this.Player, this.CONFIG);

        // When the player is stopped.
        this.Player.play();
        this.ClassOn();

        if(!this.on.Play && callback) this.on.Play = callback;
        if(this.on.Play && typeof(this.on.Play) === 'function') this.on.Play(this.Player, this.CONFIG);
      } else {
        // When the player is playing.
        this.Pause();
        this.ClassOff();
      }
    }
  }

  Stop(callback){
    this.Player.pause();
    this.Player.currentTime(0);
    this.ClassOff();

    if(!this.on.Stop && callback) this.on.Stop = callback;
    if(this.on.Stop && typeof(this.on.Stop) === 'function') this.on.Stop(this.Player, this.CONFIG);
  }

  Pause(callback){
    this.Player.pause();
    this.ClassOff();

    if(!this.on.Pause && callback) this.on.Pause = callback;
    if(this.on.Pause && typeof(this.on.Pause) === 'function') this.on.Pause(this.Player, this.CONFIG);
  }

  Mute(){
    if(this.Player.muted()){
      this.CONFIG.muted = false;
      this.Player.muted(false);
      this.SetVolume(this.CONFIG.volume);
      dom.removeClass(this.$uiBtnMute, 'active');
    }else{
      this.CONFIG.muted = true;
      this.Player.muted(true);
      this.Player.volume(0);
      dom.addClass(this.$uiBtnMute, 'active');
    }
  }

  /**
   * When Media change.
   *
   * id       | str      | media-id.
   * callback | function | callback function after changed.
   */
  Change(id, callback){
    let _that = this;

    // 動画IDが取得出来ない場合は処理を中止
    if(id == '' || id == null || id == undefined) return

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
      this.Player.muted(true);
      this.Player.play();

      this.Player.catalog.getVideo(id, (error, video) => {

        // reload palyer data.
        this.Player.catalog.load(video);

        // Set MediaInfo
        this.PlayerMediaInfo = this.Player.mediainfo;
        this.SetInfo();
        this.SetPoster();

        // replay after data change.
        setTimeout( () => {
          this.Player.play();
          this.Player.muted(false);
          this.ClassOff();
          this.ClassOn();
        }, 100);

        setTimeout( () => {
          this.PlayerChangeLoadFlg = true;

          if(!this.on.Change && callback) this.on.Change = callback;
          if(this.on.Change && typeof(this.on.Change) === 'function') this.on.Change(this.Player, this.CONFIG);
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
      if(this.on.Change && typeof(this.on.Change) === 'function') this.on.Change();

    }

  }

  PauseAll(callback){
    window.PLAYER_MODULE_ALL_PLATLIST.map((item,index)=>{
      item.instance.Pause();
    });

    if(!this.on.PauseAll && callback) this.on.PauseAll = callback;
    if(this.on.PauseAll && typeof(this.on.PauseAll) === 'function') this.on.PauseAll(this.Player, this.CONFIG);
  }

  StopAll(callback){
    window.PLAYER_MODULE_ALL_PLATLIST.map((item,index)=>{
      item.instance.Stop();
    });

    if(!this.on.StopAll && callback) this.on.StopAll = callback;
    if(this.on.StopAll && typeof(this.on.StopAll) === 'function') this.on.StopAll(this.Player, this.CONFIG);
  }

  SeekTo(sec){
    if(!sec) return false;
    if(typeof sec == 'object' || typeof sec == 'function') return false;
    if(typeof sec == 'string') sec = Number(sec);
    if(!sec) return false;
    this.Player.currentTime(sec);
  }

  GetTime(){
    function parseNumber(num) {
      if(typeof(num) === 'number') num = String(num);
      if (num < 10) return '0'+num;
      if (num >= 10) return num;
    }
    let _m = parseNumber(Math.floor(this.Player.currentTime()/60));
    let _s = parseNumber(Math.floor(this.Player.currentTime()%60));
    if(isFinite(_s) && isFinite(_m)) return _m+':'+_s;
    else return '00:00';
  }

  GetTimeDown(){
    function parseNumber(num) {
      if(typeof(num) === 'number') num = String(num);
      if (num < 10) return '0'+num;
      if (num >= 10) return num;
    }
    let _countDownTime = this.Player.duration() - this.Player.currentTime();
    let _m_down        = parseNumber(Math.floor(_countDownTime / 60));
    let _s_down        = parseNumber(Math.floor(_countDownTime % 60));
    if(isFinite(_s_down) && isFinite(_m_down)) return _m_down+':'+_s_down;
    else return '00:00';
  }

  GetTimeMax(){
    function parseNumber(num) {
      if(typeof(num) === 'number') num = String(num);
      if (num < 10) return '0'+num;
      if (num >= 10) return num;
    }
    let _m_max = parseNumber(Math.floor(this.Player.duration()/60));
    let _s_max = parseNumber(Math.floor(this.Player.duration()%60));
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

  SetVolume(vol){
    this.CONFIG.volume = vol ? vol : this.CONFIG.volume;
    this.Player.volume(this.CONFIG.volume);
  }

  SetPoster(){
    if(this.CONFIG.poster != false) this.CONFIG.poster = this.Player.poster();

    if(this.$uiDisplayPoster){
      if(this.CONFIG.mode == 'audio'){
        dom.setHtml(this.$uiDisplayPoster, '');
      } else {
        dom.setHtml(this.$uiDisplayPoster, `<img src="${this.CONFIG.poster}" alt="">`);
      }
    }

    if(this.$uiDisplayPosterBg && this.CONFIG.mode != 'audio'){
      dom.setStyle(this.$uiDisplayPosterBg, { backgroundImage : `url(${this.CONFIG.poster})` });
    }
  }

  SetInfo(){
    if(this.$uiDisplayName) dom.setHtml(this.$uiDisplayName, this.PlayerMediaInfo.name);
  }

  SetPoster(path){
    this.Player.poster(path);
  }

  Destroy(){
    this.Player.reset();
  }

}
