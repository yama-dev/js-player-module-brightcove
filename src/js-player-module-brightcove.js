/*!
 * JS PLAYER MODULE BRIGHTCOVE (JavaScript Library)
 *   js-player-module-brightcove.js
 * Version 2.1.0
 * Repository https://github.com/yama-dev/js-player-module-brightcove
 * Copyright yama-dev
 * Licensed under the MIT license.
 */

import { viewPlayerScriptcode, viewPlayer, viewPlayerUi, viewPlayerStyle } from './view.js';

export class PLAYER_MODULE_BRIGHTCOVE {

  constructor(options = {}){

    // Set Version.
    this.VERSION = '2.0.12';

    // Use for discrimination by URL.
    this.currentUrl = location.href;

    // Set config, options.
    this.config = {
      mode           : options.mode||'movie',
      id             : options.id||'pmb',
      player_id      : options.id+'_player'||'pmb_player',
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
      style_text     : options.style_text||'',
      other          : options.other||''
    }

    // Set config, callback functions.
    if(!options.on){
      options.on = {}
    }
    this.on = {
      Play    : options.on.Play||'',
      Pause   : options.on.Pause||'',
      Stop    : options.on.Stop||'',
      StopAll : options.on.StopAll||'',
      Change  : options.on.Change||''
    }

    // BrightcovePlayer MediaInfo
    this.PlayerMediaInfo = {};

    // BrightcovePlayer Instance.
    this.Player = '';

    // Set Load Flg
    this.PlayerLoadFlg = false;

    // Set ChangeLoad Flg
    this.PlayerChangeLoadFlg = true;

    // Import Views.
    this.playerHtml       = viewPlayer;
    this.playerUiHtml     = viewPlayerUi;
    this.playerCss        = viewPlayerStyle;
    this.playerScriptCode = viewPlayerScriptcode;

    // Check Audio mode.
    if(this.config.mode == 'audio'){
      this.config.width  = 1;
      this.config.height = 1;
      this.playerCss += `#${this.config.player_id} { opacity: 0; }`;
    }

    // Set Options
    // -> playerHtml
    // -> playerScriptCode
    // -> playerCss
    for (let obj in this.config) {
      let _reg = new RegExp('({{.?' + obj + '.?}})','g');
      let _regIn = new RegExp('{{.?(' + obj + ').?}}','g');
      this.playerHtml.match(_regIn);
      let _regInStr = RegExp.$1;
      this.playerHtml = this.playerHtml.replace(_regIn, this.config[_regInStr]);
    }
    for (let obj1 in this.config) {
      let _reg = new RegExp('({{.?' + obj1 + '.?}})','g');
      let _regIn = new RegExp('{{.?(' + obj1 + ').?}}','g');
      this.playerScriptCode.match(_regIn);
      let _regInStr = RegExp.$1;
      this.playerScriptCode = this.playerScriptCode.replace(_regIn, this.config[_regInStr]);
    }
    for (let obj2 in this.config) {
      let _reg2 = new RegExp('({{.?' + obj2 + '.?}})','g');
      let _regIn2 = new RegExp('{{.?(' + obj2 + ').?}}','g');
      this.playerCss.match(_regIn2);
      let _regInStr2 = RegExp.$1;
      this.playerCss = this.playerCss.replace(_regIn2, this.config[_regInStr2]);
    }

    Element.prototype.hasClass = function(className){
      let classArray = this.className.split(' ');
      return classArray.indexOf(className) >= 0;
    }
    Element.prototype.addClass = function(className){
      if(!this.hasClass(className)){
        let classArray = this.className.split(' ');
        classArray.push(className);
        this.className = classArray.join(' ');
      }
      return this;
    }
    Element.prototype.removeClass = function(className){
      let classArray = this.className.split(' ');
      let index = classArray.indexOf(className);
      if(index >= 0){
        classArray.splice(index, 1);
        this.className = classArray.join(' ');
      }
      return this;
    }
    Element.prototype.toggleClass = function(className){
      this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
    }

    // DebugMode
    if(this.currentUrl.search(/localhost/) !== -1 || this.currentUrl.search(/192.168/) !== -1){
      this.DebugMode();
    } else { }

    // Player
    let playerElem            = document.getElementById(this.config.id);
    let playerHtmlDom         = document.createElement('div');
    let playerUiHtmlDom       = document.createElement('div');
    let playerCssDom          = document.createElement('style');
    playerHtmlDom.innerHTML   = this.playerHtml;
    playerUiHtmlDom.innerHTML = this.playerUiHtml;
    playerCssDom.innerHTML    = this.playerCss;
    playerCssDom.id           = this.config.id+'_scripttag';
    playerElem.appendChild(playerHtmlDom);
    if(this.config.ui_default){
      playerElem.appendChild(playerUiHtmlDom);
    }
    if(this.config.ui_default_css){
      playerElem.appendChild(playerCssDom);
    }

    // SetPlayer
    document.addEventListener('DOMContentLoaded', (event) => {
      this.SetPlayer();
    });

  }

  DebugMode(){
    console.log(this);
  }

  DebugModePlayer(){
    console.log(
      'player_id  -> '+this.config.player_id+'\n'+
      'readyState -> '+this.Player.readyState()+'\n'
    );
  }

  SetPlayer(){
    let _that = this;

    // CacheElement
    this.CacheElement();

    // Set ScriptTag
    let s = document.createElement('script');
    s.id  = _that.config.id+'_scripttag';
    s.src = this.playerScriptCode;
    document.body.appendChild(s);
    s.onload = SetPlayerEvent;

    // SetPlayerEvent
    function SetPlayerEvent(){

      // Check Player try loaded.
      let checkPlayerCount      = 0;
      let checkPlayerLimitCount = 100;
      let checkPlayer = setInterval(function(){

        // Check upper limit of action to try.
        if(checkPlayerCount >= checkPlayerLimitCount){
          clearInterval(checkPlayer);
          console.log('ERROR: not movie loaded.');
        } else {
          checkPlayerCount++;
        }

        if(videojs(_that.config.player_id).mediainfo){

          clearInterval(checkPlayer);

          // Set Instance
          _that.Player = videojs(_that.config.player_id);

          // Set PlayerJson
          _that.PlayerJson = _that.Player.toJSON();

          // Set MediaInfo
          _that.PlayerMediaInfo = _that.Player.mediainfo;

          // DebugMode
          if(_that.currentUrl.search(/localhost/) !== -1 || _that.currentUrl.search(/192.168/) !== -1){
            _that.DebugModePlayer();
          } else { }

          // ロードイベントが複数掛からないためのハック
          if(_that.PlayerLoadFlg === true) return false;

          // Set Load Flg
          _that.PlayerLoadFlg = true;

          _that.SetVolume();
          _that.SetMute();
          _that.SetInfo();
          _that.SetPoster();

          _that.EventPlay();
          _that.EventPause();
          _that.EventStop();
          _that.EventMute();
          _that.EventVolon();
          _that.EventVoloff();
          _that.EventBtnFull();
          _that.EventSeekbarVol();
          _that.EventSeekbarTime();
          _that.EventChangeVideo();

          // For Timeupdate.
          videojs(_that.config.player_id).on('timeupdate', function() {
            _that.Update();
          });

          // For Volume change.
          videojs(_that.config.player_id).on('volumechange', function() {
            // 音量バーの更新(％)
            _that.$uiSeekbarVolCover.style.width = (_that.Player.volume() * 100) + '%';
          });

          // For Ended movie paly.
          videojs(_that.config.player_id).on('ended', function() {
            _that.Stop();
          });

          // For Error
          videojs(_that.config.player_id).on( 'error' , function(err) {
            console.log(this.error().code);
          });

        }

      }, 100);

    }

    // windowオブジェクトへインスタンスしたPlayerを配列で管理(Player-IDを文字列で追加)
    if(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST === undefined){
      window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST = [];
      window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST.push({
        id: _that.config.id,
        player_id: _that.config.player_id
      });
    }else{
      window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST.push({
        id: _that.config.id,
        player_id: _that.config.player_id
      });
    }
  }

  CacheElement(){
    this.$uiBtnPlay                  = document.querySelectorAll('#'+this.config.id+' .btn_play')                      ? document.querySelectorAll('#'+this.config.id+' .btn_play')                      : document.createElement('div');
    this.$uiBtnStop                  = document.querySelectorAll('#'+this.config.id+' .btn_stop')                      ? document.querySelectorAll('#'+this.config.id+' .btn_stop')                      : document.createElement('div');
    this.$uiBtnPause                 = document.querySelectorAll('#'+this.config.id+' .btn_pause')                     ? document.querySelectorAll('#'+this.config.id+' .btn_pause')                     : document.createElement('div');
    this.$uiBtnMute                  = document.querySelector('#'+this.config.id+' .btn_mute')                         ? document.querySelector('#'+this.config.id+' .btn_mute')                         : document.createElement('div');
    this.$uiBtnVolon                 = document.querySelector('#'+this.config.id+' .btn_volon')                        ? document.querySelector('#'+this.config.id+' .btn_volon')                        : document.createElement('div');
    this.$uiBtnVoloff                = document.querySelector('#'+this.config.id+' .btn_voloff')                       ? document.querySelector('#'+this.config.id+' .btn_voloff')                       : document.createElement('div');
    this.$uiDisplayTime              = document.querySelector('#'+this.config.id+' .display_time')                     ? document.querySelector('#'+this.config.id+' .display_time')                     : document.createElement('div');
    this.$uiDisplayTimeDown          = document.querySelector('#'+this.config.id+' .display_time_down')                ? document.querySelector('#'+this.config.id+' .display_time_down')                : document.createElement('div');
    this.$uiDisplayTimePar           = document.querySelector('#'+this.config.id+' .display_time_par')                 ? document.querySelector('#'+this.config.id+' .display_time_par')                 : document.createElement('div');
    this.$uiDisplayPoster            = document.querySelector('#'+this.config.id+' .display_poster')                   ? document.querySelector('#'+this.config.id+' .display_poster')                   : document.createElement('div');
    this.$uiDisplayName              = document.querySelector('#'+this.config.id+' .display_name')                     ? document.querySelector('#'+this.config.id+' .display_name')                     : document.createElement('div');
    this.$uiBtnFull                  = document.querySelector('#'+this.config.id+' .btn_full')                         ? document.querySelector('#'+this.config.id+' .btn_full')                         : document.createElement('div');
    this.$uiSeekbarVol               = document.querySelector('#'+this.config.id+' .seekbar_vol')                      ? document.querySelector('#'+this.config.id+' .seekbar_vol')                      : document.createElement('div');
    this.$uiSeekbarVolBg             = document.querySelector('#'+this.config.id+' .seekbar_vol .seekbar_vol_bg')      ? document.querySelector('#'+this.config.id+' .seekbar_vol .seekbar_vol_bg')      : document.createElement('div');
    this.$uiSeekbarVolCover          = document.querySelector('#'+this.config.id+' .seekbar_vol span')                 ? document.querySelector('#'+this.config.id+' .seekbar_vol span')                 : document.createElement('div');
    this.$uiSeekbarTime              = document.querySelector('#'+this.config.id+' .seekbar_time')                     ? document.querySelector('#'+this.config.id+' .seekbar_time')                     : document.createElement('div');
    this.$uiSeekbarTimeBg            = document.querySelector('#'+this.config.id+' .seekbar_time .seekbar_time_bg')    ? document.querySelector('#'+this.config.id+' .seekbar_time .seekbar_time_bg')    : document.createElement('div');
    this.$uiSeekbarTimeCover         = document.querySelector('#'+this.config.id+' .seekbar_time span')                ? document.querySelector('#'+this.config.id+' .seekbar_time span')                : document.createElement('div');
    this.$uiBtnChange                = document.querySelectorAll('#'+this.config.id+' .btn_change')                    ? document.querySelectorAll('#'+this.config.id+' .btn_change')                    : document.createElement('div');
    this.$uiBtnChangeDisplayTime     = document.querySelector('#'+this.config.id+' .display_time')                     ? document.querySelector('#'+this.config.id+' .display_time')                     : document.createElement('div');
    this.$uiBtnChangeDisplayTimeDown = document.querySelector('#'+this.config.id+' .display_time_down')                ? document.querySelector('#'+this.config.id+' .display_time_down')                : document.createElement('div');
  }

  EventPlay(){
    let _that = this;
    if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){

      for (var j = 0; j < this.$uiBtnPlay.length; ++j) {
        this.$uiBtnPlay[j].addEventListener('click', (event) => {
          if(this.Player.paused()){
            // 停止状態の場合
            _that.Play();
          } else {
            // 再生状態の場合
            _that.Pause();
          }
        });
      }

    }
  }

  EventPause(){
    let _that = this;
    if(this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0){
      for (var j = 0; j < this.$uiBtnPause.length; ++j) {
        this.$uiBtnPause[j].addEventListener('click', (event) => {
          _that.Pause();
        });
      }
    }
  }

  EventStop(){
    let _that = this;
    if(this.$uiBtnStop !== null && this.$uiBtnStop.length !== 0){
      for (var j = 0; j < this.$uiBtnStop.length; ++j) {
        this.$uiBtnStop[j].addEventListener('click', (event) => {
          _that.Stop();
        });
      }
    }

    window.addEventListener('blur', () => {
      if(this.config.stop_outfocus) this.Stop();
    });
  }

  EventMute(){
    if(this.$uiBtnMute !== null){
      this.$uiBtnMute.addEventListener('click', (event) => {
        if(this.Player.muted()){
          this.Player.muted(false);
          this.Player.volume(this.config.volume);
          this.$uiBtnMute.removeClass('active');
        }else{
          this.Player.muted(true);
          this.Player.volume(0);
          this.$uiBtnMute.addClass('active');
          this.$uiSeekbarVolCover.style.width = 0 + '%';
        }
      });
    }
  }

  EventVolon(){
    if(this.$uiBtnVolon !== null){
      this.$uiBtnVolon.addEventListener('click', (event) => {
        this.Player.muted(false);
        this.Player.volume(this.config.volume);
        this.$uiBtnVolon.removeClass('active');
      });
    }
  }

  EventVoloff(){
    if(this.$uiBtnVoloff !== null){
      this.$uiBtnVoloff.addEventListener('click', (event) => {
        this.Player.muted(true);
        this.Player.volume(0);
        this.$uiBtnVoloff.addClass('active');
        this.$uiSeekbarVolCover.style.width = 0 + '%';
      });
    }
  }

  EventBtnFull(){
    if(this.$uiBtnFull !== null){
      this.$uiBtnFull.addEventListener('click', (event) => {
        this.Player.requestFullscreen();
      });
    }
  }

  EventSeekbarVol(){
    if(this.$uiSeekbarVol !== null){
      let _flag = false;
      this.$uiSeekbarVolCover.style.width = 100 + '%';
      this.$uiSeekbarVol.addEventListener('mousedown', (event) => {
        _flag = true;
        let _currentWidth    = this.$uiSeekbarVol.clientWidth;
        let _clickPosition  = this.$uiSeekbarVol.getBoundingClientRect().left;
        let _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
        this.Player.volume(_targetWidth);
        this.config.volume = _targetWidth;
      });
      this.$uiSeekbarVol.addEventListener('mouseleave', (event) => {
        _flag = false;
      });
      this.$uiSeekbarVol.addEventListener('mouseup', (event) => {
        _flag = false;
      });
      this.$uiSeekbarVol.addEventListener('mousemove', (event) => {
        if(_flag === true){
          let _currentWidth    = this.$uiSeekbarVol.clientWidth;
          let _clickPosition  = this.$uiSeekbarVol.getBoundingClientRect().left;
          let _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
          this.Player.volume(_targetWidth);
          this.config.volume = _targetWidth;
        }
      });
    }
  }

  EventSeekbarTime(){
    let _that = this;

    if(this.$uiSeekbarTime !== null){
      let _flag = false;

      this.$uiSeekbarTime.addEventListener('mousedown', (event) => {

        _flag = true;

        _that.Pause();

        let _currentWidth    = this.$uiSeekbarTime.clientWidth;
        let _clickPosition  = this.$uiSeekbarTime.getBoundingClientRect().left;
        let _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
        let _targetTime = this.Player.duration() * _targetWidth;
        this.$uiSeekbarTimeCover.style.width = (_targetWidth * 100) + '%';
        this.Player.currentTime(_targetTime);

      });

      this.$uiSeekbarTime.addEventListener('mouseleave', (event) => {
        if(_flag === true){
          this.Player.play();
          if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
            for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
              this.$uiBtnPlay[i].addClass('active');
            }
          }
          if(this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0){
            for (var i = 0; i < this.$uiBtnPause.length; ++i) {
              this.$uiBtnPause[i].addClass('active');
            }
          }
        }
        _flag = false;
      });

      this.$uiSeekbarTime.addEventListener('mouseup', (event) => {
        if(_flag === true){
          this.Player.play();
          if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
            for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
              this.$uiBtnPlay[i].addClass('active');
            }
          }
          if(this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0){
            for (var i = 0; i < this.$uiBtnPause.length; ++i) {
              this.$uiBtnPause[i].addClass('active');
            }
          }
        }
        _flag = false;
      });

      this.$uiSeekbarTime.addEventListener('mousemove', (event) => {
        if(_flag === true){
          let _currentWidth    = this.$uiSeekbarTime.clientWidth;
          let _clickPosition  = this.$uiSeekbarTime.getBoundingClientRect().left;
          let _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
          let _targetTime = this.Player.duration() * _targetWidth;
          this.$uiSeekbarTimeCover.style.width = (_targetWidth * 100) + '%';
          this.Player.currentTime(_targetTime);
        }
      });

    }
    if(this.$uiBtnRound !== null){
      this.$uiBtnRound.addEventListener('click', (event) => {
        _that.Pause();
        let _currentWidth      = this.$uiBtnRound.clientWidth;
        let _currentWidthHalf  = _currentWidth / 2;
        let _clickPositionLeft = this.$uiBtnRound.getBoundingClientRect().left;
        let _clickPositionTop  = this.$uiBtnRound.getBoundingClientRect().top;
        let _x = event.pageX - _clickPositionLeft - _currentWidthHalf;
        let _y = event.pageY - (_clickPositionTop + window.pageYOffset) - _currentWidthHalf;
        let _deg = Math.atan2( _y, _x ) * 180 / Math.PI;
        if(_deg >= -90 && _deg <= 0){
          _deg = _deg + 90;
        } else if(_deg >= 0 && _deg <= 90){
          _deg = _deg + 90;
        } else if(_deg >= 90 && _deg <= 180){
          _deg = _deg + 90;
        } else if(_deg >= -180 && _deg <= -90){
          _deg = _deg + 360 + 90;
        }
        // this.$uiSeekbarTimeCover.style.width = (_targetWidth * 100) + '%';
        this.Player.currentTime(this.Player.duration() * (_deg / 360) );
        this.$uiBtnRoundSpan.style.webkitTransform = 'rotate('+_deg+'deg)';
        this.Player.play();
      });
    }
    if(this.$uiBtnRoundSvg !== null){
      let _roundNum = this.$uiBtnRoundSvg.clientWidth * 3.14;
      this.$uiBtnRoundSvg.addEventListener('click', (event) => {
        _that.Pause();
        let _currentWidth      = this.$uiBtnRoundSvg.clientWidth;
        let _currentWidthHalf  = _currentWidth / 2;
        let _clickPositionLeft = this.$uiBtnRoundSvg.getBoundingClientRect().left;
        let _clickPositionTop  = this.$uiBtnRoundSvg.getBoundingClientRect().top;
        let _x = event.pageX - _clickPositionLeft - _currentWidthHalf;
        let _y = event.pageY - (_clickPositionTop + window.pageYOffset) - _currentWidthHalf;
        let _deg = Math.atan2( _y, _x ) * 180 / Math.PI;
        if(_deg >= -90 && _deg <= 0){
          _deg = _deg + 90;
        } else if(_deg >= 0 && _deg <= 90){
          _deg = _deg + 90;
        } else if(_deg >= 90 && _deg <= 180){
          _deg = _deg + 90;
        } else if(_deg >= -180 && _deg <= -90){
          _deg = _deg + 360 + 90;
        }
        this.Player.currentTime(this.Player.duration() * (_deg / 360) );
        this.$uiBtnRoundSvgPath.style.cssText = 'stroke-dashoffset: '+(_roundNum + 10 - _deg / 365 * _roundNum)+';';
        this.Player.play();
      });
    }
  }

  EventChangeVideo(){
    let _that = this;
    if(this.$uiBtnChange !== null && this.$uiBtnChange.length !== 0){
      for (var j = 0; j < this.$uiBtnChange.length; ++j) {
        this.$uiBtnChange[j].addEventListener('click', (event) => {
          // 動画IDを取得
          // -> <data-PMB-id="">
          let id = event.currentTarget.dataset.pmbId;
          _that.Change(id);
        });
      }
    }
  }

  Update(){

    if(this.PlayerChangeLoadFlg){
      // 再生時間の更新(分秒)
      this.$uiDisplayTime.innerHTML          = this.GetTime()+'/'+this.GetTimeMax();
      this.$uiBtnChangeDisplayTime.innerHTML = this.GetTime()+'/'+this.GetTimeMax();

      // 再生時間の更新(分秒)
      this.$uiDisplayTimeDown.innerHTML          = this.GetTimeDown();
      this.$uiBtnChangeDisplayTimeDown.innerHTML = this.GetTimeDown();

      // 再生時間の更新(％)
      this.$uiDisplayTimePar.innerHTML = this.GetTimePar();

      // シークバーの更新(％)
      this.$uiSeekbarTimeCover.style.width       = this.GetTimePar();
    } else {
      // 再生時間の更新(分秒)
      this.$uiDisplayTime.innerHTML          = '00:00';
      this.$uiBtnChangeDisplayTime.innerHTML = '00:00';

      // 再生時間の更新(分秒)
      this.$uiDisplayTimeDown.innerHTML          = '00:00';
      this.$uiBtnChangeDisplayTimeDown.innerHTML = '00:00';

      // 再生時間の更新(％)
      this.$uiDisplayTimePar.innerHTML = '0%';

      // シークバーの更新(％)
      this.$uiSeekbarTimeCover.style.width       = '0%';
    }

  }

  Play(callback){
    let _that = this;
    if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
      if(this.Player.paused()){
        // 停止状態の場合
        this.Player.play();
        if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
          for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
            this.$uiBtnPlay[i].addClass('active');
          }
        }
        if(this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0){
          for (var i = 0; i < this.$uiBtnPause.length; ++i) {
            this.$uiBtnPause[i].addClass('active');
          }
        }
      } else {
        // 再生状態の場合
        _that.Pause();
        if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
          for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
            this.$uiBtnPlay[i].removeClass('active');
          }
        }
        if(this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0){
          for (var i = 0; i < this.$uiBtnPause.length; ++i) {
            this.$uiBtnPause[i].removeClass('active');
          }
        }
      }
    }

    if(!this.on.Play && callback) this.on.Play = callback;
    if(this.on.Play && typeof(this.on.Play) === 'function') this.on.Play();
  }

  Stop(callback){
    this.Player.pause();
    this.Player.currentTime(0);

    // 再生中のPLAYボタンのhtml-classを削除
    if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
      for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
        this.$uiBtnPlay[i].removeClass('active');
      }
    }

    // 再生中のPAUSEボタンのhtml-classを削除
    if(this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0){
      for (var i = 0; i < this.$uiBtnPause.length; ++i) {
        this.$uiBtnPause[i].removeClass('active');
      }
    }

    // メディア変更ボタンのhtml-classを削除
    let clickElemAll = Array.prototype.slice.call( document.querySelectorAll('[data-PMB-id]') );
    if(clickElemAll){
      clickElemAll.forEach(function(elem,i){
        elem.removeClass('active');
      });
    }

    if(!this.on.Stop && callback) this.on.Stop = callback;
    if(this.on.Stop && typeof(this.on.Stop) === 'function') this.on.Stop();
  }

  Pause(callback){

    this.Player.pause();

    // 再生中のPLAYボタンのhtml-classを削除
    if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
      for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
        this.$uiBtnPlay[i].removeClass('active');
      }
    }

    // 再生中のPAUSEボタンのhtml-classを削除
    if(this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0){
      for (var i = 0; i < this.$uiBtnPause.length; ++i) {
        this.$uiBtnPause[i].removeClass('active');
      }
    }

    // メディア変更ボタンのhtml-classを削除
    let clickElemAll = Array.prototype.slice.call( document.querySelectorAll('[data-PMB-id]') );
    if(clickElemAll){
      clickElemAll.forEach(function(elem,i){
        elem.removeClass('active');
      });
    }

    if(!this.on.Pause && callback) this.on.Pause = callback;
    if(this.on.Pause && typeof(this.on.Pause) === 'function') this.on.Pause();
  }

  Change(id, callback){
    let _that = this;

    // 動画IDが取得出来ない場合は処理を中止
    if(id == '' || id == null || id == undefined) return

    if(document.querySelector('[data-PMB-id="'+id+'"]')){
      if(document.querySelector('[data-PMB-id="'+id+'"]').hasClass('active')){
        _that.Pause();
        return
      }

      this.$uiBtnChangeDisplayTime     = document.querySelector('[data-PMB-id="'+id+'"]'+' .display_time') ? document.querySelector('[data-PMB-id="'+id+'"]'+' .display_time') : document.createElement('div');
      this.$uiBtnChangeDisplayTimeDown = document.querySelector('[data-PMB-id="'+id+'"]'+' .display_time_down') ? document.querySelector('[data-PMB-id="'+id+'"]'+' .display_time_down') : document.createElement('div');
    }

    // 同じメディアを選択しているかを判定
    if(this.config.videoid !== id){

      this.PlayerChangeLoadFlg = false;

      // clickイベントの伝播内に一度再生位置をリセットする
      // IE、Edgeでは、バグがあるため除外
      var _ua = window.navigator.userAgent.toLowerCase();
      if(_ua.indexOf('msie') == -1 && _ua.indexOf('trident') == -1 && _ua.indexOf('edge') == -1) {
        this.Player.currentTime(0);
      }

      // clickイベントの伝播内に一度再生開始処理を走らせる
      this.Player.muted(true);
      this.Player.play();

      this.Player.catalog.getVideo(id, (error, video) => {

        // プレーヤーの情報を再ロード
        this.Player.catalog.load(video);

        // 変更後に再生
        setTimeout( () => {
          this.Player.play();
          this.Player.muted(false);
        }, 100);

        // Set MediaInfo
        this.PlayerMediaInfo = this.Player.mediainfo;
        // Overwrite video id.
        this.config.videoid = id;
        // Set Information.
        this.SetInfo();
        this.SetPoster();

        // Playボタンにhtml-classを付与
        if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
          for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
            this.$uiBtnPlay[i].addClass('active');
          }
        }

        // PAUSEボタンにhtml-classを付与
        if(this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0){
          for (var i = 0; i < this.$uiBtnPause.length; ++i) {
            this.$uiBtnPause[i].addClass('active');
          }
        }

        // メディア変更ボタンにhtml-classを付与
        let clickElemAll = Array.prototype.slice.call( document.querySelectorAll('[data-PMB-id]') );
        let clickElem = document.querySelector('[data-PMB-id="'+id+'"]');
        if(clickElemAll){
          clickElemAll.forEach(function(elem,i){
            elem.removeClass('active');
          });
        }
        if(clickElem){
          clickElem.addClass('active');
        }

      });

      // 次のメディア情報が取得できたかを判定
      this.Player.on('loadeddata',() => {
        this.PlayerChangeLoadFlg = true;
        this.Player.off('loadeddata');
      });

      if(!this.on.Change && callback) this.on.Change = callback;
      if(this.on.Change && typeof(this.on.Change) === 'function') this.on.Change();

    } else {

      this.Player.muted(false);
      this.Player.play();

      // Playボタンにhtml-classを付与
      if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
        for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
          this.$uiBtnPlay[i].addClass('active');
        }
      }

      // PAUSEボタンにhtml-classを付与
      if(this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0){
        for (var i = 0; i < this.$uiBtnPause.length; ++i) {
          this.$uiBtnPause[i].addClass('active');
        }
      }

      // メディア変更ボタンにhtml-classを付与
      let clickElemAll = Array.prototype.slice.call( document.querySelectorAll('[data-PMB-id]') );
      let clickElem = document.querySelector('[data-PMB-id="'+id+'"]');
      if(clickElemAll){
        clickElemAll.forEach(function(elem,i){
          elem.removeClass('active');
        });
      }
      if(clickElem){
        clickElem.addClass('active');
      }

      if(!this.on.Change && callback) this.on.Change = callback;
      if(this.on.Change && typeof(this.on.Change) === 'function') this.on.Change();

    }

  }

  StopAll(callback){
    for (var _i in window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST) {
      videojs(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].player_id).pause();
      videojs(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].player_id).currentTime(0);
      this.$uiBtnPlayAll  = document.querySelectorAll('#'+window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id+' .btn_play')  ? document.querySelectorAll('#'+window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id+' .btn_play')  : document.createElement('div');
      this.$uiBtnStopAll  = document.querySelectorAll('#'+window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id+' .btn_stop')  ? document.querySelectorAll('#'+window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id+' .btn_stop')  : document.createElement('div');
      this.$uiBtnPauseAll = document.querySelectorAll('#'+window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id+' .btn_pause') ? document.querySelectorAll('#'+window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id+' .btn_pause') : document.createElement('div');
      if(this.$uiBtnPlayAll !== null && this.$uiBtnPlayAll.length !== 0){
        for (var i = 0; i < this.$uiBtnPlayAll.length; ++i) {
          this.$uiBtnPlayAll[i].removeClass('active');
        }
      }
      if(this.$uiBtnStopAll !== null && this.$uiBtnStopAll.length !== 0){
        for (var i = 0; i < this.$uiBtnStopAll.length; ++i) {
          this.$uiBtnStopAll[i].removeClass('active');
        }
      }
      if(this.$uiBtnPauseAll !== null && this.$uiBtnPauseAll.length !== 0){
        for (var i = 0; i < this.$uiBtnPauseAll.length; ++i) {
          this.$uiBtnPauseAll[i].removeClass('active');
        }
      }
      // メディア変更ボタンのhtml-classを削除
      let clickElemAll = Array.prototype.slice.call( document.querySelectorAll('[data-PMB-id]') );
      if(clickElemAll){
        clickElemAll.forEach(function(elem,i){
          elem.removeClass('active');
        });
      }
    }

    if(!this.on.StopAll && callback) this.on.StopAll = callback;
    if(this.on.StopAll && typeof(this.on.StopAll) === 'function') this.on.StopAll();
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

  GetInfo(){
    return this.PlayerMediaInfo;
  }

  GetUrlPoster(){
    return this.PlayerMediaInfo.poster;
  }

  GetName(){
    return this.PlayerMediaInfo.name;
  }

  GetDescription(){
    return this.PlayerMediaInfo.description;
  }

  GetTags(){
    return this.PlayerMediaInfo.tags;
  }

  SetMute(){
    if(this.Player.muted()){
      this.Player.volume(0);
      this.$uiBtnMute.addClass('active');
    }else{
      this.Player.volume(this.config.volume);
      this.$uiBtnMute.removeClass('active');
    }
  }

  SetVolume(){
    if(this.config.volume){
      this.Player.volume(this.config.volume);
    }
  }

  SetInfo(){
    if(this.$uiDisplayName !== null && this.$uiDisplayName.length !== 0){
      this.$uiDisplayName.innerHTML = this.PlayerMediaInfo.name;
    }
  }

  SetPoster(){
    if(this.config.mode == 'audio'){
      this.$uiDisplayPoster.innerHTML = '';
    } else if(this.config.poster){
      this.Player.poster(this.config.poster);
      if(this.$uiDisplayPoster !== null && this.$uiDisplayPoster.length !== 0){
        this.$uiDisplayPoster.innerHTML = '<img src="' + this.config.poster + '" alt="">';
      }
    } else {
      if(this.$uiDisplayPoster !== null && this.$uiDisplayPoster.length !== 0){
        this.$uiDisplayPoster.innerHTML = '<img src="' + this.Player.poster() + '" alt="">';
      }
    }
  }

  SetUrlPoster(url){
    this.Player.poster(url);
  }

  Destroy(){
    this.Player.reset();
  }

}
