/*!
 * js-player-module-brightcove.js JavaScript Library v1.0
 * https://github.com/yama-dev/js-player-module-brightcove
 * Copyright yama-dev
 * Licensed under the MIT license.
 * Date: 2017-03-14
 */
(function(){
class PLAYER_MODULE_BRIGHTCOVE {
  constructor(options = {}){
    // 設定
    if(!window.console) {window.console = { log: function(msg){} };}
    // URLでの判別に利用
    this.currentUrl = location.href;
    // オプション設定用
    this.config = {
      mode        : options.mode||'movie',
      id          : options.id||'pmb',
      player_id   : options.id+'_player'||'pmb_player',
      videoid     : options.videoid||'',
      account     : options.account||'',
      width       : options.width||null,
      height      : options.height||null,
      player      : options.player||'default',
      ui_controls : options.ui_controls == true ? 'controls' : '',
      ui_autoplay : options.ui_autoplay == true ? 'autoplay' : '',
      ui_default  : options.ui_default||null,
      poster      : options.poster||null,
    }
    this.playerVideo = {
      id          : '',
      name        : '',
      description : '',
      duration    : '',
      thumbnail   : '',
    }

    this.Player = '';

    this.playerHtml = `
      <video id="${this.config.player_id}"
        data-video-id="{{ videoid }}"
        data-account="{{ account }}"
        data-player="{{ player }}"
        data-embed="default"
        data-application-id
        class="video-js"
        width="{{ width }}"
        height="{{ height }}"
        {{ui_controls}}
        {{ui_autoplay}}
        ></video>
    `;

    this.playerUiHtml = `
      <div class="display_time">00:00</div>
      <div class="display_time_par">0%</div>
      <button class="btn_play btn btn-default">play</button>
      <button class="btn_pause btn btn-default">pause</button>
      <button class="btn_stop btn btn-default">stop</button>
      <button class="btn_mute btn btn-default">mute</button>
      <div class="seekbar_time"><div class="seekbar_time_bg"></div><span></span></div>
      <div class="seekbar_vol"><div class="seekbar_vol_bg"></div><span></span></div>
      <button class="btn_full btn btn-default">full screen</button>
      <div class="display_poster"><img src="" alt=""></div>
    `;

    this.playerScriptCode = '//players.brightcove.net/{{ account }}/{{ player }}_default/index.min.js';

    this.playerCss = `
#${this.config.id} {
  position: relative;
}
#${this.config.id} .on {
  display: none;
}
#${this.config.id} .off {
  display: block;
}
#${this.config.id} .btn_play {
  width: 120px;
  height: 30px;
  // position: absolute;
  // top: 8px;
  // left: 10px;
  display: block;
  cursor: pointer;
}
#${this.config.id} .btn_play.active {
  display: none;
}
#${this.config.id} .btn_play:hover .on {
  display: block;
}
#${this.config.id} .btn_play:hover .off {
  display: none;
}
#${this.config.id} .btn_pause {
  width: 120px;
  height: 30px;
  // position: absolute;
  // top: 8px;
  // left: 10px;
  display: none;
  cursor: pointer;
}
#${this.config.id} .btn_pause.active {
  display: block;
}
#${this.config.id} .btn_pause:hover .on {
  display: block;
}
#${this.config.id} .btn_pause:hover .off {
  display: none;
}
#${this.config.id} .btn_stop {
  width: 120px;
  height: 30px;
  // position: absolute;
  // top: 8px;
  // left: 10px;
  cursor: pointer;
}
#${this.config.id} .btn_stop.active {
  display: block;
}
#${this.config.id} .btn_stop:hover .on {
  display: block;
}
#${this.config.id} .btn_stop:hover .off {
  display: none;
}
#${this.config.id} .btn_mute {
  width: 120px;
  height: 30px;
  // position: absolute;
  // top: 6px;
  // left: 110px;
  cursor: pointer;
}
#${this.config.id} .btn_mute.active .on {
  display: block;
}
#${this.config.id} .btn_mute.active .off {
  display: none;
}
#${this.config.id} .seekbar_vol {
  width: 100%;
  height: 9px;
  padding: 2px 0;
  position: relative;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#${this.config.id} .seekbar_vol .seekbar_vol_bg {
  width: 100%;
  height: 5px;
  background: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  margin: 2px 0;
}
#${this.config.id} .seekbar_vol span {
  display: block;
  width: 0%;
  height: 100%;
  background: #666;
  position: relative;
}
#${this.config.id} .seekbar_time {
  width: 100%;
  height: 9px;
  padding: 2px 0;
  position: relative;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#${this.config.id} .seekbar_time .seekbar_time_bg {
  width: 100%;
  height: 5px;
  background: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  margin: 2px 0;
}
#${this.config.id} .seekbar_time span {
  display: block;
  width: 0%;
  height: 100%;
  background: #666;
  position: relative;
}
    `;

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
    let playerElem = document.getElementById(this.config.id);
    let playerHtmlDom = document.createElement('div');
    let playerUiHtmlDom = document.createElement('div');
    let playerCssDom = document.createElement('style');
    playerHtmlDom.innerHTML = this.playerHtml;
    playerUiHtmlDom.innerHTML = this.playerUiHtml;
    playerCssDom.innerHTML = this.playerCss;
    playerCssDom.id = this.config.id+'_scripttag';
    playerElem.appendChild(playerHtmlDom);
    if(this.config.ui_default){
      playerElem.appendChild(playerUiHtmlDom);
      playerElem.appendChild(playerCssDom);
    }

    // SetPlayer
    document.addEventListener('DOMContentLoaded', (event) => {
      this.SetPlayer();
    });

  }
  SetPlayer(){
    let _that = this;

    // CacheElement
    this.CacheElement();

    // Set ScriptTag
    let s = document.createElement('script');
    s.id = _that.config.id+'_scripttag';
    s.src = this.playerScriptCode;
    document.body.appendChild(s);
    s.onload = SetPlayerEvent;

    // SetPlayerEvent
    function SetPlayerEvent(){

      // Set Load Event
      let ua = window.navigator.userAgent.toLowerCase();
      let ver = window.navigator.appVersion.toLowerCase();
      let loadNum = '0';
      let loadEvent = '';
      if (ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1){
        loadNum = '0';
        loadEvent = 'loadedmetadata';
      } else if (ua.indexOf('chrome') != -1){
        loadNum = '1';
        loadEvent = 'loadedmetadata';
        if (ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) {
          // Android
          loadNum = '4'; // uaにChrome
          loadEvent = 'loadedmetadata';
        }
      } else if (ua.indexOf('safari') != -1){
        loadNum = '1';
        loadEvent = 'loadedmetadata';
        if (ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) {
          // Android
          loadNum = '2'; // uaにsafari
          loadEvent = 'loadedmetadata';
        }
      } else if (ua.indexOf('opera') != -1){
        loadNum = '0';
        loadEvent = 'loadedmetadata';
      } else if (ua.indexOf('firefox') != -1){
        loadNum = '3';
        loadEvent = 'loadeddata';
      } else {
        loadNum = '1';
        loadEvent = 'loadedmetadata';
      }

      // Set Load Flg
      _that.PlayerLoadFlg = false;

      videojs(_that.config.player_id).on( loadEvent , function() {

        // Set Instance
        _that.Player = this;

        // Set PlayerJson
        _that.PlayerJson = _that.Player.toJSON();

        // DebugMode
        if(_that.currentUrl.search(/localhost/) !== -1 || _that.currentUrl.search(/192.168/) !== -1){
          _that.DebugModePlayer(loadEvent,loadNum);
        } else { }

        if(_that.config.poster){
          _that.Player.poster(_that.config.poster);
          _that.$uiDisplayPoster.innerHTML = '<img src="' + _that.config.poster + '" alt="">';
        }

        // ロードイベントが複数掛からないためのハック
        if(String(_that.Player.readyState()) !== loadNum || _that.PlayerLoadFlg === true) return false;

        // Set Load Flg
        _that.PlayerLoadFlg = true;

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
      });
      videojs(_that.config.player_id).on('timeupdate', function() {
        // 再生時間の更新(分秒)
        _that.$uiDisplayTime.innerHTML = _that.GetTime()+'/'+_that.GetTimeMax();
        // 再生時間の更新(％)
        _that.$uiDisplayTimePar.innerHTML = _that.GetTimePar();
        // シークバーの更新(％)
        _that.$uiSeekbarTimeCover.style.width = _that.GetTimePar();
      });
      videojs(_that.config.player_id).on('volumechange', function() {
        // 音量バーの更新(％)
        _that.$uiSeekbarVolCover.style.width = (_that.Player.volume() * 100) + '%';
      });
    }
    if(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST === undefined){
      window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST = [];
      window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST.push(_that.config.player_id);
    }else{
      window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST.push(_that.config.player_id);
    }
  }
  DebugMode(){
    console.log(this);
  }
  DebugModePlayer(loadEvent,loadNum){
    console.log(
      'player_id  -> '+this.config.player_id+'\n'+
      'readyState -> '+this.Player.readyState()+'\n'+
      'loadNum    -> '+loadNum+'\n'+
      'loadEvent  -> '+loadEvent+'\n'
    );
  }
  CacheElement(){
    this.$uiBtnPlay          = document.querySelectorAll('#'+this.config.id+' .btn_play')                   ? document.querySelectorAll('#'+this.config.id+' .btn_play')                   : document.createElement('div');
    this.$uiBtnStop          = document.querySelector('#'+this.config.id+' .btn_stop')                      ? document.querySelector('#'+this.config.id+' .btn_stop')                      : document.createElement('div');
    this.$uiBtnPause         = document.querySelector('#'+this.config.id+' .btn_pause')                     ? document.querySelector('#'+this.config.id+' .btn_pause')                     : document.createElement('div');
    this.$uiBtnMute          = document.querySelector('#'+this.config.id+' .btn_mute')                      ? document.querySelector('#'+this.config.id+' .btn_mute')                      : document.createElement('div');
    this.$uiBtnVolon         = document.querySelector('#'+this.config.id+' .btn_volon')                     ? document.querySelector('#'+this.config.id+' .btn_volon')                     : document.createElement('div');
    this.$uiBtnVoloff        = document.querySelector('#'+this.config.id+' .btn_voloff')                    ? document.querySelector('#'+this.config.id+' .btn_voloff')                    : document.createElement('div');
    this.$uiDisplayTime      = document.querySelector('#'+this.config.id+' .display_time')                  ? document.querySelector('#'+this.config.id+' .display_time')                  : document.createElement('div');
    this.$uiDisplayTimePar   = document.querySelector('#'+this.config.id+' .display_time_par')              ? document.querySelector('#'+this.config.id+' .display_time_par')              : document.createElement('div');
    this.$uiDisplayPoster    = document.querySelector('#'+this.config.id+' .display_poster')                ? document.querySelector('#'+this.config.id+' .display_poster')                : document.createElement('div');
    this.$uiBtnFull          = document.querySelector('#'+this.config.id+' .btn_full')                      ? document.querySelector('#'+this.config.id+' .btn_full')                      : document.createElement('div');
    this.$uiSeekbarVol       = document.querySelector('#'+this.config.id+' .seekbar_vol')                   ? document.querySelector('#'+this.config.id+' .seekbar_vol')                   : document.createElement('div');
    this.$uiSeekbarVolBg     = document.querySelector('#'+this.config.id+' .seekbar_vol .seekbar_vol_bg')   ? document.querySelector('#'+this.config.id+' .seekbar_vol .seekbar_vol_bg')   : document.createElement('div');
    this.$uiSeekbarVolCover  = document.querySelector('#'+this.config.id+' .seekbar_vol span')              ? document.querySelector('#'+this.config.id+' .seekbar_vol span')              : document.createElement('div');
    this.$uiSeekbarTime      = document.querySelector('#'+this.config.id+' .seekbar_time')                  ? document.querySelector('#'+this.config.id+' .seekbar_time')                  : document.createElement('div');
    this.$uiSeekbarTimeBg    = document.querySelector('#'+this.config.id+' .seekbar_time .seekbar_time_bg') ? document.querySelector('#'+this.config.id+' .seekbar_time .seekbar_time_bg') : document.createElement('div');
    this.$uiSeekbarTimeCover = document.querySelector('#'+this.config.id+' .seekbar_time span')             ? document.querySelector('#'+this.config.id+' .seekbar_time span')             : document.createElement('div');
    this.$uiBtnChange        = document.querySelectorAll('#'+this.config.id+' .btn_change')                 ? document.querySelectorAll('#'+this.config.id+' .btn_change')                 : document.createElement('div');
  }
  EventPlay(){
    if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
      for (var j = 0; j < this.$uiBtnPlay.length; ++j) {
        this.$uiBtnPlay[j].addEventListener('click', (event) => {
          if(this.Player.paused()){
            // 停止状態の場合
            this.Player.play();
            if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
              for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
                this.$uiBtnPlay[i].addClass('active');
              }
            }
            this.$uiBtnPause.addClass('active');
          } else {
            // 再生状態の場合
            this.Player.pause();
            if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
              for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
                this.$uiBtnPlay[i].removeClass('active');
              }
            }
            this.$uiBtnPause.removeClass('active');
          }
        });
      }
    }
  }
  EventPause(){
    if(this.$uiBtnPause !== null){
      this.$uiBtnPause.addEventListener('click', (event) => {
        this.Player.pause();
        if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
          for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
            this.$uiBtnPlay[i].removeClass('active');
          }
        }
        this.$uiBtnPause.removeClass('active');
      });
    }
  }
  EventStop(){
    if(this.$uiBtnStop !== null){
      this.$uiBtnStop.addEventListener('click', (event) => {
        this.Player.pause();
        this.Player.currentTime(0);
        this.StopAll();
        if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
          for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
            this.$uiBtnPlay[i].removeClass('active');
          }
        }
        this.$uiBtnPause.removeClass('active');
      });
    }
  }
  EventMute(){
    if(this.$uiBtnMute !== null){
      this.$uiBtnMute.addEventListener('click', (event) => {
        if(this.Player.muted()){
          this.Player.muted(false);
          this.Player.volume(1);
          this.$uiBtnMute.removeClass('active');
          this.$uiSeekbarVolCover.style.width = 100 + '%';
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
        this.Player.volume(1);
        this.$uiBtnVolon.removeClass('active');
        this.$uiSeekbarVolCover.style.width = 100 + '%';
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
        }
      });
    }
  }
  EventSeekbarTime(){
    if(this.$uiSeekbarTime !== null){
      let _flag = false;
      this.$uiSeekbarTime.addEventListener('mousedown', (event) => {
        _flag = true;
        this.Player.pause();
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
          this.$uiBtnPause.addClass('active');
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
          this.$uiBtnPause.addClass('active');
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
  }
  EventChangeVideo(){
    if(this.$uiBtnChange !== null && this.$uiBtnChange.length !== 0){
      for (var j = 0; j < this.$uiBtnChange.length; ++j) {
        this.$uiBtnChange[j].addEventListener('click', (event) => {
          let id = event.currentTarget.dataset.id;
          this.Player.catalog.getVideo(id, (error, video) => {

            // プレーヤーの情報を再ロード
            this.Player.catalog.load(video);

            // 変更後に再生
            this.Play();

            // Set Video Data
            this.playerVideo.id          = video.id;
            this.playerVideo.name        = video.name;
            this.playerVideo.description = video.description;
            this.playerVideo.duration    = video.duration;
            this.playerVideo.thumbnail   = video.thumbnail;
          });
        });
      }
    }
  }
  Play(){
    if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
      if(this.Player.paused()){
        // 停止状態の場合
        this.Player.play();
        if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
          for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
            this.$uiBtnPlay[i].addClass('active');
          }
        }
        this.$uiBtnPause.addClass('active');
      } else {
        // 再生状態の場合
        this.Player.pause();
        if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
          for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
            this.$uiBtnPlay[i].removeClass('active');
          }
        }
        this.$uiBtnPause.removeClass('active');
      }
    }
  }
  Stop(){
    this.Player.pause();
    this.Player.currentTime(0);
    this.StopAll();
    if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
      for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
        this.$uiBtnPlay[i].removeClass('active');
      }
    }
    this.$uiBtnPause.removeClass('active');
  }
  Pause(){
    this.Player.pause();
    if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
      for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
        this.$uiBtnPlay[i].removeClass('active');
      }
    }
    this.$uiBtnPause.removeClass('active');
  }
  Change(id){
    this.Player.catalog.getVideo(id, (error, video) => {

      // プレーヤーの情報を再ロード
      this.Player.catalog.load(video);

      // 変更後に再生
      this.Player.play();
      if(this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0){
        for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
          this.$uiBtnPlay[i].addClass('active');
        }
      }
      this.$uiBtnPause.addClass('active');

      // Set Video Data
      this.playerVideo.id          = video.id;
      this.playerVideo.name        = video.name;
      this.playerVideo.description = video.description;
      this.playerVideo.duration    = video.duration;
      this.playerVideo.thumbnail   = video.thumbnail;
    });
  }
  StopAll(){
    for (var _i in window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST) {
      videojs(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i]).pause();
    }
  }
  GetTime(){
    function parseNumber(num) {
      if(typeof(num) === 'number') num = String(num);
      if (num < 10) return '0'+num;
      if (num >= 10) return num;
    }
    let _m = parseNumber(Math.floor(this.Player.currentTime()/60));
    let _s = parseNumber(Math.floor(this.Player.currentTime()%60));
    return _m+':'+_s;
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
    return Math.floor(this.Player.currentTime() / this.Player.duration() * 100) / 100;
  }
  GetTimePar(){
    return (Math.floor(this.Player.currentTime() / this.Player.duration() * 1000) / 10) + '%';
  }
  GetUrlPoster(){
    return this.Player.poster();
  }
  SetUrlPoster(url){
    this.Player.poster(url);
  }
  Destroy(){
    this.Player.reset();
  }
}
window.PLAYER_MODULE_BRIGHTCOVE = PLAYER_MODULE_BRIGHTCOVE || {};
})(window);

