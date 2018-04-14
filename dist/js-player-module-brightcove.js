'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * @license
 *
 * JS PLAYER MODULE BRIGHTCOVE (JavaScript Library)
 *   js-player-module-brightcove[.min].js
 *
 * versoin 2.0.0
 * Repository https://github.com/yama-dev/js-player-module-brightcove
 * Copyright yama-dev
 * Licensed under the MIT license.
 * Release 2018-04-12
 *
 * Instance
 *   new PLAYER_MODULE_BRIGHTCOVE({ options });
 *
 */
var PLAYER_MODULE_BRIGHTCOVE = function () {
  function PLAYER_MODULE_BRIGHTCOVE() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PLAYER_MODULE_BRIGHTCOVE);

    // 設定
    if (!window.console) {
      window.console = { log: function log(msg) {} };
    }
    // URLでの判別に利用
    this.currentUrl = location.href;
    // オプション設定用
    this.config = {
      mode: options.mode || 'movie',
      id: options.id || 'pmb',
      player_id: options.id + '_player' || 'pmb_player',
      videoid: options.videoid || '',
      account: options.account || '',
      width: options.width || '',
      height: options.height || '',
      player: options.player || 'default',
      ui_controls: options.ui_controls == true ? 'controls' : '',
      ui_autoplay: options.ui_autoplay == true ? 'autoplay' : '',
      ui_default: options.ui_default == false ? false : true,
      ui_default_css: options.ui_default_css == false ? false : true,
      poster: options.poster || null,
      ui_round: options.ui_round || null,
      ui_round_num: options.ui_round_num || 146,
      ui_round_color: options.ui_round_color || '#696969',
      style_text: options.style_text || ''
    };
    this.playerVideo = {
      id: '',
      name: '',
      description: '',
      duration: '',
      thumbnail: ''
    };

    this.Player = '';

    this.playerHtml = '\n      <video id="' + this.config.player_id + '"\n        data-video-id="{{ videoid }}"\n        data-account="{{ account }}"\n        data-player="{{ player }}"\n        data-embed="default"\n        data-application-id\n        class="video-js"\n        width="{{ width }}"\n        height="{{ height }}"\n        {{ui_controls}}\n        {{ui_autoplay}}\n        ></video>\n    ';

    this.playerUiHtml = '\n      <div class="display_time">00:00</div>\n      <div class="display_time_par">0%</div>\n      <button class="btn_play btn btn-default">play</button>\n      <button class="btn_pause btn btn-default">pause</button>\n      <button class="btn_stop btn btn-default">stop</button>\n      <button class="btn_mute btn btn-default">mute</button>\n      <div class="seekbar_time"><div class="seekbar_time_bg"></div><span></span></div>\n      <div class="seekbar_vol"><div class="seekbar_vol_bg"></div><span></span></div>\n      <button class="btn_full btn btn-default">full screen</button>\n      <div class="display_poster"><img src="" alt=""></div>\n      <div class="display_name"></div>\n    ';

    this.playerScriptCode = '//players.brightcove.net/{{ account }}/{{ player }}_default/index.min.js';

    this.playerCss = '\n#' + this.config.id + ' {\n  position: relative;\n}\n#' + this.config.id + ' .on {\n  display: none;\n}\n#' + this.config.id + ' .off {\n  display: block;\n}\n#' + this.config.id + ' .btn_play {\n  width: 120px;\n  height: 30px;\n  // position: absolute;\n  // top: 8px;\n  // left: 10px;\n  display: block;\n  cursor: pointer;\n}\n#' + this.config.id + ' .btn_play.active {\n  display: none;\n}\n#' + this.config.id + ' .btn_play:hover .on {\n  display: block;\n}\n#' + this.config.id + ' .btn_play:hover .off {\n  display: none;\n}\n#' + this.config.id + ' .btn_pause {\n  width: 120px;\n  height: 30px;\n  // position: absolute;\n  // top: 8px;\n  // left: 10px;\n  display: none;\n  cursor: pointer;\n}\n#' + this.config.id + ' .btn_pause.active {\n  display: block;\n}\n#' + this.config.id + ' .btn_pause:hover .on {\n  display: block;\n}\n#' + this.config.id + ' .btn_pause:hover .off {\n  display: none;\n}\n#' + this.config.id + ' .btn_stop {\n  width: 120px;\n  height: 30px;\n  // position: absolute;\n  // top: 8px;\n  // left: 10px;\n  cursor: pointer;\n}\n#' + this.config.id + ' .btn_stop.active {\n  display: block;\n}\n#' + this.config.id + ' .btn_stop:hover .on {\n  display: block;\n}\n#' + this.config.id + ' .btn_stop:hover .off {\n  display: none;\n}\n#' + this.config.id + ' .btn_mute {\n  width: 120px;\n  height: 30px;\n  // position: absolute;\n  // top: 6px;\n  // left: 110px;\n  cursor: pointer;\n}\n#' + this.config.id + ' .btn_mute.active .on {\n  display: block;\n}\n#' + this.config.id + ' .btn_mute.active .off {\n  display: none;\n}\n#' + this.config.id + ' .seekbar_vol {\n  width: 100%;\n  height: 9px;\n  padding: 2px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#' + this.config.id + ' .seekbar_vol .seekbar_vol_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 2px 0;\n}\n#' + this.config.id + ' .seekbar_vol span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n#' + this.config.id + ' .seekbar_time {\n  width: 100%;\n  height: 9px;\n  padding: 2px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#' + this.config.id + ' .seekbar_time .seekbar_time_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 2px 0;\n}\n#' + this.config.id + ' .seekbar_time span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n    ';

    if (this.config.mode == 'audio') {
      this.config.width = 1;
      this.config.height = 1;
      this.playerCss += '#' + this.config.player_id + ' { opacity: 0; }';
    }

    // Set Options
    // -> playerHtml
    // -> playerScriptCode
    // -> playerCss
    for (var obj in this.config) {
      var _reg = new RegExp('({{.?' + obj + '.?}})', 'g');
      var _regIn = new RegExp('{{.?(' + obj + ').?}}', 'g');
      this.playerHtml.match(_regIn);
      var _regInStr = RegExp.$1;
      this.playerHtml = this.playerHtml.replace(_regIn, this.config[_regInStr]);
    }
    for (var obj1 in this.config) {
      var _reg3 = new RegExp('({{.?' + obj1 + '.?}})', 'g');
      var _regIn3 = new RegExp('{{.?(' + obj1 + ').?}}', 'g');
      this.playerScriptCode.match(_regIn3);
      var _regInStr3 = RegExp.$1;
      this.playerScriptCode = this.playerScriptCode.replace(_regIn3, this.config[_regInStr3]);
    }
    for (var obj2 in this.config) {
      var _reg2 = new RegExp('({{.?' + obj2 + '.?}})', 'g');
      var _regIn2 = new RegExp('{{.?(' + obj2 + ').?}}', 'g');
      this.playerCss.match(_regIn2);
      var _regInStr2 = RegExp.$1;
      this.playerCss = this.playerCss.replace(_regIn2, this.config[_regInStr2]);
    }

    Element.prototype.hasClass = function (className) {
      var classArray = this.className.split(' ');
      return classArray.indexOf(className) >= 0;
    };
    Element.prototype.addClass = function (className) {
      if (!this.hasClass(className)) {
        var classArray = this.className.split(' ');
        classArray.push(className);
        this.className = classArray.join(' ');
      }
      return this;
    };
    Element.prototype.removeClass = function (className) {
      var classArray = this.className.split(' ');
      var index = classArray.indexOf(className);
      if (index >= 0) {
        classArray.splice(index, 1);
        this.className = classArray.join(' ');
      }
      return this;
    };
    Element.prototype.toggleClass = function (className) {
      this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
    };

    // DebugMode
    if (this.currentUrl.search(/localhost/) !== -1 || this.currentUrl.search(/192.168/) !== -1) {
      this.DebugMode();
    } else {}

    // Player
    var playerElem = document.getElementById(this.config.id);
    var playerHtmlDom = document.createElement('div');
    var playerUiHtmlDom = document.createElement('div');
    var playerCssDom = document.createElement('style');
    playerHtmlDom.innerHTML = this.playerHtml;
    playerUiHtmlDom.innerHTML = this.playerUiHtml;
    playerCssDom.innerHTML = this.playerCss;
    playerCssDom.id = this.config.id + '_scripttag';
    playerElem.appendChild(playerHtmlDom);
    if (this.config.ui_default) {
      playerElem.appendChild(playerUiHtmlDom);
    }
    if (this.config.ui_default_css) {
      playerElem.appendChild(playerCssDom);
    }

    // SetPlayer
    document.addEventListener('DOMContentLoaded', function (event) {
      _this.SetPlayer();
    });
  }

  _createClass(PLAYER_MODULE_BRIGHTCOVE, [{
    key: 'DebugMode',
    value: function DebugMode() {
      console.log(this);
    }
  }, {
    key: 'DebugModePlayer',
    value: function DebugModePlayer() {
      console.log('player_id  -> ' + this.config.player_id + '\n' + 'readyState -> ' + this.Player.readyState() + '\n');
    }
  }, {
    key: 'SetPlayer',
    value: function SetPlayer() {
      var _that = this;

      // CacheElement
      this.CacheElement();

      // Set ScriptTag
      var s = document.createElement('script');
      s.id = _that.config.id + '_scripttag';
      s.src = this.playerScriptCode;
      document.body.appendChild(s);
      s.onload = SetPlayerEvent;

      // SetPlayerEvent
      function SetPlayerEvent() {

        // Set Load Flg
        _that.PlayerLoadFlg = false;

        // For Error
        videojs(_that.config.player_id).on('error', function (err) {
          console.log(this.error().code);
        });

        // TODO: Add LimitInterval.
        var checkPlayer = setInterval(function () {

          if (videojs(_that.config.player_id).mediainfo) {

            clearInterval(checkPlayer);

            // Set Instance
            _that.Player = videojs(_that.config.player_id);

            // Set PlayerJson
            _that.PlayerJson = _that.Player.toJSON();

            // Set MediaInfo
            _that.PlayerMediaInfo = _that.Player.mediainfo;

            // DebugMode
            if (_that.currentUrl.search(/localhost/) !== -1 || _that.currentUrl.search(/192.168/) !== -1) {
              _that.DebugModePlayer();
            } else {}

            if (_that.config.poster) {
              _that.Player.poster(_that.config.poster);
              _that.$uiDisplayPoster.innerHTML = '<img src="' + _that.config.poster + '" alt="">';
            }

            // ロードイベントが複数掛からないためのハック
            if (_that.PlayerLoadFlg === true) return false;

            // Set Load Flg
            _that.PlayerLoadFlg = true;

            _that.SetInfo();
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
          }
        }, 100);

        videojs(_that.config.player_id).on('timeupdate', function () {
          // 再生時間の更新(分秒)
          _that.$uiDisplayTime.innerHTML = _that.GetTime() + '/' + _that.GetTimeMax();
          // 再生時間の更新(分秒)
          _that.$uiDisplayTimeDown.innerHTML = _that.GetTimeDown();
          // 再生時間の更新(％)
          _that.$uiDisplayTimePar.innerHTML = _that.GetTimePar();
          // シークバーの更新(％)
          _that.$uiSeekbarTimeCover.style.width = _that.GetTimePar();
          _that.$uiBtnRoundSpan.style.webkitTransform = 'rotate(' + 360 * _that.GetTimeRatio() + 'deg)';
          var _roundNum = _that.$uiBtnRoundSvg.clientWidth * 3.14 !== 0 ? _that.$uiBtnRoundSvg.clientWidth * 3.14 : _that.config.ui_round_num * 3.14;
          _that.$uiBtnRoundSvgPath.style.cssText = 'stroke-dashoffset: ' + (_roundNum + 10 - 360 * _that.GetTimeRatio() / 365 * _roundNum) + ';';
        });
        videojs(_that.config.player_id).on('volumechange', function () {
          // 音量バーの更新(％)
          _that.$uiSeekbarVolCover.style.width = _that.Player.volume() * 100 + '%';
        });
        videojs(_that.config.player_id).on('ended', function () {
          _that.Stop();
        });
      }

      // windowオブジェクトへインスタンスしたPlayerを配列で管理(Player-IDを文字列で追加)
      if (window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST === undefined) {
        window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST = [];
        window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST.push({
          id: _that.config.id,
          player_id: _that.config.player_id
        });
      } else {
        window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST.push({
          id: _that.config.id,
          player_id: _that.config.player_id
        });
      }
    }
  }, {
    key: 'CacheElement',
    value: function CacheElement() {
      this.$uiBtnPlay = document.querySelectorAll('#' + this.config.id + ' .btn_play') ? document.querySelectorAll('#' + this.config.id + ' .btn_play') : document.createElement('div');
      this.$uiBtnStop = document.querySelectorAll('#' + this.config.id + ' .btn_stop') ? document.querySelectorAll('#' + this.config.id + ' .btn_stop') : document.createElement('div');
      this.$uiBtnPause = document.querySelectorAll('#' + this.config.id + ' .btn_pause') ? document.querySelectorAll('#' + this.config.id + ' .btn_pause') : document.createElement('div');
      this.$uiBtnMute = document.querySelector('#' + this.config.id + ' .btn_mute') ? document.querySelector('#' + this.config.id + ' .btn_mute') : document.createElement('div');
      this.$uiBtnVolon = document.querySelector('#' + this.config.id + ' .btn_volon') ? document.querySelector('#' + this.config.id + ' .btn_volon') : document.createElement('div');
      this.$uiBtnVoloff = document.querySelector('#' + this.config.id + ' .btn_voloff') ? document.querySelector('#' + this.config.id + ' .btn_voloff') : document.createElement('div');
      this.$uiDisplayTime = document.querySelector('#' + this.config.id + ' .display_time') ? document.querySelector('#' + this.config.id + ' .display_time') : document.createElement('div');
      this.$uiDisplayTimeDown = document.querySelector('#' + this.config.id + ' .display_time_down') ? document.querySelector('#' + this.config.id + ' .display_time_down') : document.createElement('div');
      this.$uiDisplayTimePar = document.querySelector('#' + this.config.id + ' .display_time_par') ? document.querySelector('#' + this.config.id + ' .display_time_par') : document.createElement('div');
      this.$uiDisplayPoster = document.querySelector('#' + this.config.id + ' .display_poster') ? document.querySelector('#' + this.config.id + ' .display_poster') : document.createElement('div');
      this.$uiDisplayName = document.querySelector('#' + this.config.id + ' .display_name') ? document.querySelector('#' + this.config.id + ' .display_name') : document.createElement('div');
      this.$uiBtnFull = document.querySelector('#' + this.config.id + ' .btn_full') ? document.querySelector('#' + this.config.id + ' .btn_full') : document.createElement('div');
      this.$uiSeekbarVol = document.querySelector('#' + this.config.id + ' .seekbar_vol') ? document.querySelector('#' + this.config.id + ' .seekbar_vol') : document.createElement('div');
      this.$uiSeekbarVolBg = document.querySelector('#' + this.config.id + ' .seekbar_vol .seekbar_vol_bg') ? document.querySelector('#' + this.config.id + ' .seekbar_vol .seekbar_vol_bg') : document.createElement('div');
      this.$uiSeekbarVolCover = document.querySelector('#' + this.config.id + ' .seekbar_vol span') ? document.querySelector('#' + this.config.id + ' .seekbar_vol span') : document.createElement('div');
      this.$uiSeekbarTime = document.querySelector('#' + this.config.id + ' .seekbar_time') ? document.querySelector('#' + this.config.id + ' .seekbar_time') : document.createElement('div');
      this.$uiSeekbarTimeBg = document.querySelector('#' + this.config.id + ' .seekbar_time .seekbar_time_bg') ? document.querySelector('#' + this.config.id + ' .seekbar_time .seekbar_time_bg') : document.createElement('div');
      this.$uiSeekbarTimeCover = document.querySelector('#' + this.config.id + ' .seekbar_time span') ? document.querySelector('#' + this.config.id + ' .seekbar_time span') : document.createElement('div');
      this.$uiBtnChange = document.querySelectorAll('#' + this.config.id + ' .btn_change') ? document.querySelectorAll('#' + this.config.id + ' .btn_change') : document.createElement('div');
      this.$uiBtnRound = document.querySelector('#' + this.config.id + ' .btn_round') ? document.querySelector('#' + this.config.id + ' .btn_round') : document.createElement('div');
      this.$uiBtnRoundSpan = document.querySelector('#' + this.config.id + ' .btn_round span') ? document.querySelector('#' + this.config.id + ' .btn_round span') : document.createElement('div');
      this.$uiBtnRoundSvg = document.querySelector('#' + this.config.id + ' .btn_roundsvg') ? document.querySelector('#' + this.config.id + ' .btn_roundsvg') : document.createElement('div');
      this.$uiBtnRoundSvgPath = document.querySelector('#' + this.config.id + ' .btn_roundsvg .btn_roundsvg__path') ? document.querySelector('#' + this.config.id + ' .btn_roundsvg .btn_roundsvg__path') : document.createElement('div');
    }
  }, {
    key: 'EventPlay',
    value: function EventPlay() {
      var _this2 = this;

      var _that = this;
      if (this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0) {

        for (var j = 0; j < this.$uiBtnPlay.length; ++j) {
          this.$uiBtnPlay[j].addEventListener('click', function (event) {
            if (_this2.Player.paused()) {
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
  }, {
    key: 'EventPause',
    value: function EventPause() {
      var _that = this;
      if (this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0) {
        for (var j = 0; j < this.$uiBtnPause.length; ++j) {
          this.$uiBtnPause[j].addEventListener('click', function (event) {
            _that.Pause();
          });
        }
      }
    }
  }, {
    key: 'EventStop',
    value: function EventStop() {
      var _that = this;
      if (this.$uiBtnStop !== null && this.$uiBtnStop.length !== 0) {
        for (var j = 0; j < this.$uiBtnStop.length; ++j) {
          this.$uiBtnStop[j].addEventListener('click', function (event) {
            _that.Stop();
          });
        }
      }
    }
  }, {
    key: 'EventStopAll',
    value: function EventStopAll() {
      // TODO: Modify StopAll function.
      this.StopAll();
    }
  }, {
    key: 'EventMute',
    value: function EventMute() {
      var _this3 = this;

      if (this.$uiBtnMute !== null) {
        this.$uiBtnMute.addEventListener('click', function (event) {
          if (_this3.Player.muted()) {
            _this3.Player.muted(false);
            _this3.Player.volume(1);
            _this3.$uiBtnMute.removeClass('active');
            _this3.$uiSeekbarVolCover.style.width = 100 + '%';
          } else {
            _this3.Player.muted(true);
            _this3.Player.volume(0);
            _this3.$uiBtnMute.addClass('active');
            _this3.$uiSeekbarVolCover.style.width = 0 + '%';
          }
        });
      }
    }
  }, {
    key: 'EventVolon',
    value: function EventVolon() {
      var _this4 = this;

      if (this.$uiBtnVolon !== null) {
        this.$uiBtnVolon.addEventListener('click', function (event) {
          _this4.Player.muted(false);
          _this4.Player.volume(1);
          _this4.$uiBtnVolon.removeClass('active');
          _this4.$uiSeekbarVolCover.style.width = 100 + '%';
        });
      }
    }
  }, {
    key: 'EventVoloff',
    value: function EventVoloff() {
      var _this5 = this;

      if (this.$uiBtnVoloff !== null) {
        this.$uiBtnVoloff.addEventListener('click', function (event) {
          _this5.Player.muted(true);
          _this5.Player.volume(0);
          _this5.$uiBtnVoloff.addClass('active');
          _this5.$uiSeekbarVolCover.style.width = 0 + '%';
        });
      }
    }
  }, {
    key: 'EventBtnFull',
    value: function EventBtnFull() {
      var _this6 = this;

      if (this.$uiBtnFull !== null) {
        this.$uiBtnFull.addEventListener('click', function (event) {
          _this6.Player.requestFullscreen();
        });
      }
    }
  }, {
    key: 'EventSeekbarVol',
    value: function EventSeekbarVol() {
      var _this7 = this;

      if (this.$uiSeekbarVol !== null) {
        var _flag = false;
        this.$uiSeekbarVolCover.style.width = 100 + '%';
        this.$uiSeekbarVol.addEventListener('mousedown', function (event) {
          _flag = true;
          var _currentWidth = _this7.$uiSeekbarVol.clientWidth;
          var _clickPosition = _this7.$uiSeekbarVol.getBoundingClientRect().left;
          var _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
          _this7.Player.volume(_targetWidth);
        });
        this.$uiSeekbarVol.addEventListener('mouseleave', function (event) {
          _flag = false;
        });
        this.$uiSeekbarVol.addEventListener('mouseup', function (event) {
          _flag = false;
        });
        this.$uiSeekbarVol.addEventListener('mousemove', function (event) {
          if (_flag === true) {
            var _currentWidth = _this7.$uiSeekbarVol.clientWidth;
            var _clickPosition = _this7.$uiSeekbarVol.getBoundingClientRect().left;
            var _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
            _this7.Player.volume(_targetWidth);
          }
        });
      }
    }
  }, {
    key: 'EventSeekbarTime',
    value: function EventSeekbarTime() {
      var _this8 = this;

      var _that = this;

      if (this.$uiSeekbarTime !== null) {
        var _flag = false;

        this.$uiSeekbarTime.addEventListener('mousedown', function (event) {

          _flag = true;

          _that.Pause();

          var _currentWidth = _this8.$uiSeekbarTime.clientWidth;
          var _clickPosition = _this8.$uiSeekbarTime.getBoundingClientRect().left;
          var _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
          var _targetTime = _this8.Player.duration() * _targetWidth;
          _this8.$uiSeekbarTimeCover.style.width = _targetWidth * 100 + '%';
          _this8.Player.currentTime(_targetTime);
        });

        this.$uiSeekbarTime.addEventListener('mouseleave', function (event) {
          if (_flag === true) {
            _this8.Player.play();
            if (_this8.$uiBtnPlay !== null && _this8.$uiBtnPlay.length !== 0) {
              for (var i = 0; i < _this8.$uiBtnPlay.length; ++i) {
                _this8.$uiBtnPlay[i].addClass('active');
              }
            }
            if (_this8.$uiBtnPause !== null && _this8.$uiBtnPause.length !== 0) {
              for (var i = 0; i < _this8.$uiBtnPause.length; ++i) {
                _this8.$uiBtnPause[i].addClass('active');
              }
            }
          }
          _flag = false;
        });

        this.$uiSeekbarTime.addEventListener('mouseup', function (event) {
          if (_flag === true) {
            _this8.Player.play();
            if (_this8.$uiBtnPlay !== null && _this8.$uiBtnPlay.length !== 0) {
              for (var i = 0; i < _this8.$uiBtnPlay.length; ++i) {
                _this8.$uiBtnPlay[i].addClass('active');
              }
            }
            if (_this8.$uiBtnPause !== null && _this8.$uiBtnPause.length !== 0) {
              for (var i = 0; i < _this8.$uiBtnPause.length; ++i) {
                _this8.$uiBtnPause[i].addClass('active');
              }
            }
          }
          _flag = false;
        });

        this.$uiSeekbarTime.addEventListener('mousemove', function (event) {
          if (_flag === true) {
            var _currentWidth = _this8.$uiSeekbarTime.clientWidth;
            var _clickPosition = _this8.$uiSeekbarTime.getBoundingClientRect().left;
            var _targetWidth = (event.pageX - _clickPosition) / _currentWidth;
            var _targetTime = _this8.Player.duration() * _targetWidth;
            _this8.$uiSeekbarTimeCover.style.width = _targetWidth * 100 + '%';
            _this8.Player.currentTime(_targetTime);
          }
        });
      }
      if (this.$uiBtnRound !== null) {
        this.$uiBtnRound.addEventListener('click', function (event) {
          _that.Pause();
          var _currentWidth = _this8.$uiBtnRound.clientWidth;
          var _currentWidthHalf = _currentWidth / 2;
          var _clickPositionLeft = _this8.$uiBtnRound.getBoundingClientRect().left;
          var _clickPositionTop = _this8.$uiBtnRound.getBoundingClientRect().top;
          var _x = event.pageX - _clickPositionLeft - _currentWidthHalf;
          var _y = event.pageY - (_clickPositionTop + window.pageYOffset) - _currentWidthHalf;
          var _deg = Math.atan2(_y, _x) * 180 / Math.PI;
          if (_deg >= -90 && _deg <= 0) {
            _deg = _deg + 90;
          } else if (_deg >= 0 && _deg <= 90) {
            _deg = _deg + 90;
          } else if (_deg >= 90 && _deg <= 180) {
            _deg = _deg + 90;
          } else if (_deg >= -180 && _deg <= -90) {
            _deg = _deg + 360 + 90;
          }
          // this.$uiSeekbarTimeCover.style.width = (_targetWidth * 100) + '%';
          _this8.Player.currentTime(_this8.Player.duration() * (_deg / 360));
          _this8.$uiBtnRoundSpan.style.webkitTransform = 'rotate(' + _deg + 'deg)';
          _this8.Player.play();
        });
      }
      if (this.$uiBtnRoundSvg !== null) {
        var _roundNum = this.$uiBtnRoundSvg.clientWidth * 3.14;
        this.$uiBtnRoundSvg.addEventListener('click', function (event) {
          _that.Pause();
          var _currentWidth = _this8.$uiBtnRoundSvg.clientWidth;
          var _currentWidthHalf = _currentWidth / 2;
          var _clickPositionLeft = _this8.$uiBtnRoundSvg.getBoundingClientRect().left;
          var _clickPositionTop = _this8.$uiBtnRoundSvg.getBoundingClientRect().top;
          var _x = event.pageX - _clickPositionLeft - _currentWidthHalf;
          var _y = event.pageY - (_clickPositionTop + window.pageYOffset) - _currentWidthHalf;
          var _deg = Math.atan2(_y, _x) * 180 / Math.PI;
          if (_deg >= -90 && _deg <= 0) {
            _deg = _deg + 90;
          } else if (_deg >= 0 && _deg <= 90) {
            _deg = _deg + 90;
          } else if (_deg >= 90 && _deg <= 180) {
            _deg = _deg + 90;
          } else if (_deg >= -180 && _deg <= -90) {
            _deg = _deg + 360 + 90;
          }
          _this8.Player.currentTime(_this8.Player.duration() * (_deg / 360));
          _this8.$uiBtnRoundSvgPath.style.cssText = 'stroke-dashoffset: ' + (_roundNum + 10 - _deg / 365 * _roundNum) + ';';
          _this8.Player.play();
        });
      }
    }
  }, {
    key: 'EventChangeVideo',
    value: function EventChangeVideo() {
      var _that = this;
      if (this.$uiBtnChange !== null && this.$uiBtnChange.length !== 0) {
        for (var j = 0; j < this.$uiBtnChange.length; ++j) {
          this.$uiBtnChange[j].addEventListener('click', function (event) {
            // 動画IDを取得
            // -> <data-PMB-id="">
            var id = event.currentTarget.dataset.pmbId;
            _that.Change(id);
          });
        }
      }
    }
  }, {
    key: 'Play',
    value: function Play() {
      var _that = this;
      if (this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0) {
        if (this.Player.paused()) {
          // 停止状態の場合
          this.Player.play();
          if (this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0) {
            for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
              this.$uiBtnPlay[i].addClass('active');
            }
          }
          if (this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0) {
            for (var i = 0; i < this.$uiBtnPause.length; ++i) {
              this.$uiBtnPause[i].addClass('active');
            }
          }
        } else {
          // 再生状態の場合
          _that.Pause();
          if (this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0) {
            for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
              this.$uiBtnPlay[i].removeClass('active');
            }
          }
          if (this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0) {
            for (var i = 0; i < this.$uiBtnPause.length; ++i) {
              this.$uiBtnPause[i].removeClass('active');
            }
          }
        }
      }
    }
  }, {
    key: 'Stop',
    value: function Stop() {
      this.Pause();
      this.Player.currentTime(0);

      // 再生中のPLAYボタンのhtml-classを削除
      if (this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0) {
        for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
          this.$uiBtnPlay[i].removeClass('active');
        }
      }

      // 再生中のPAUSEボタンのhtml-classを削除
      if (this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0) {
        for (var i = 0; i < this.$uiBtnPause.length; ++i) {
          this.$uiBtnPause[i].removeClass('active');
        }
      }

      // メディア変更ボタンのhtml-classを削除
      var clickElemAll = Array.prototype.slice.call(document.querySelectorAll('[data-PMB-id]'));
      if (clickElemAll) {
        clickElemAll.forEach(function (elem, i) {
          elem.removeClass('active');
        });
      }
    }
  }, {
    key: 'Pause',
    value: function Pause() {

      this.Player.pause();

      // 再生中のPLAYボタンのhtml-classを削除
      if (this.$uiBtnPlay !== null && this.$uiBtnPlay.length !== 0) {
        for (var i = 0; i < this.$uiBtnPlay.length; ++i) {
          this.$uiBtnPlay[i].removeClass('active');
        }
      }

      // 再生中のPAUSEボタンのhtml-classを削除
      if (this.$uiBtnPause !== null && this.$uiBtnPause.length !== 0) {
        for (var i = 0; i < this.$uiBtnPause.length; ++i) {
          this.$uiBtnPause[i].removeClass('active');
        }
      }

      // メディア変更ボタンのhtml-classを削除
      var clickElemAll = Array.prototype.slice.call(document.querySelectorAll('[data-PMB-id]'));
      if (clickElemAll) {
        clickElemAll.forEach(function (elem, i) {
          elem.removeClass('active');
        });
      }
    }
  }, {
    key: 'Change',
    value: function Change(id) {
      var _this9 = this;

      var _that = this;

      // 動画IDが取得出来ない場合は処理を中止
      if (id == '' || id == null || id == undefined) return;

      if (document.querySelector('[data-PMB-id="' + id + '"]')) {
        if (document.querySelector('[data-PMB-id="' + id + '"]').hasClass('active')) {
          _that.Pause();
          return;
        }

        this.$uiDisplayTime = document.querySelector('[data-PMB-id="' + id + '"]' + ' .display_time') ? document.querySelector('[data-PMB-id="' + id + '"]' + ' .display_time') : document.createElement('div');
        this.$uiDisplayTimeDown = document.querySelector('[data-PMB-id="' + id + '"]' + ' .display_time_down') ? document.querySelector('[data-PMB-id="' + id + '"]' + ' .display_time_down') : document.createElement('div');
      }

      // clickイベントの伝播内に一度再生開始処理を走らせる
      this.Player.muted(true);
      this.Player.play();
      this.Player.catalog.getVideo(id, function (error, video) {

        // プレーヤーの情報を再ロード
        _this9.Player.catalog.load(video);

        // 変更後に再生
        _this9.Player.play();
        _this9.Player.muted(false);

        // Playボタンにhtml-classを付与
        if (_this9.$uiBtnPlay !== null && _this9.$uiBtnPlay.length !== 0) {
          for (var i = 0; i < _this9.$uiBtnPlay.length; ++i) {
            _this9.$uiBtnPlay[i].addClass('active');
          }
        }

        // PAUSEボタンにhtml-classを付与
        if (_this9.$uiBtnPause !== null && _this9.$uiBtnPause.length !== 0) {
          for (var i = 0; i < _this9.$uiBtnPause.length; ++i) {
            _this9.$uiBtnPause[i].addClass('active');
          }
        }

        // メディア変更ボタンにhtml-classを付与
        var clickElemAll = Array.prototype.slice.call(document.querySelectorAll('[data-PMB-id]'));
        var clickElem = document.querySelector('[data-PMB-id="' + id + '"]');
        if (clickElemAll) {
          clickElemAll.forEach(function (elem, i) {
            elem.removeClass('active');
          });
        }
        if (clickElem) {
          clickElem.addClass('active');
        }

        // Set Video Data
        _this9.playerVideo.id = video.id;
        _this9.playerVideo.name = video.name;
        _this9.playerVideo.description = video.description;
        _this9.playerVideo.duration = video.duration;
        _this9.playerVideo.thumbnail = video.thumbnail;

        // Set MediaInfo
        _this9.PlayerMediaInfo = _this9.Player.mediainfo;
        _this9.SetInfo();
      });
    }
  }, {
    key: 'StopAll',
    value: function StopAll() {
      for (var _i in window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST) {
        videojs(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].player_id).pause();
        videojs(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].player_id).currentTime(0);
        this.$uiBtnPlayAll = document.querySelectorAll('#' + window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id + ' .btn_play') ? document.querySelectorAll('#' + window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id + ' .btn_play') : document.createElement('div');
        this.$uiBtnStopAll = document.querySelectorAll('#' + window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id + ' .btn_stop') ? document.querySelectorAll('#' + window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id + ' .btn_stop') : document.createElement('div');
        this.$uiBtnPauseAll = document.querySelectorAll('#' + window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id + ' .btn_pause') ? document.querySelectorAll('#' + window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[_i].id + ' .btn_pause') : document.createElement('div');
        if (this.$uiBtnPlayAll !== null && this.$uiBtnPlayAll.length !== 0) {
          for (var i = 0; i < this.$uiBtnPlayAll.length; ++i) {
            this.$uiBtnPlayAll[i].removeClass('active');
          }
        }
        if (this.$uiBtnStopAll !== null && this.$uiBtnStopAll.length !== 0) {
          for (var i = 0; i < this.$uiBtnStopAll.length; ++i) {
            this.$uiBtnStopAll[i].removeClass('active');
          }
        }
        if (this.$uiBtnPauseAll !== null && this.$uiBtnPauseAll.length !== 0) {
          for (var i = 0; i < this.$uiBtnPauseAll.length; ++i) {
            this.$uiBtnPauseAll[i].removeClass('active');
          }
        }
      }
    }
  }, {
    key: 'GetTime',
    value: function GetTime() {
      function parseNumber(num) {
        if (typeof num === 'number') num = String(num);
        if (num < 10) return '0' + num;
        if (num >= 10) return num;
      }
      var _m = parseNumber(Math.floor(this.Player.currentTime() / 60));
      var _s = parseNumber(Math.floor(this.Player.currentTime() % 60));
      return _m + ':' + _s;
    }
  }, {
    key: 'GetTimeDown',
    value: function GetTimeDown() {
      function parseNumber(num) {
        if (typeof num === 'number') num = String(num);
        if (num < 10) return '0' + num;
        if (num >= 10) return num;
      }
      var _countDownTime = this.Player.duration() - this.Player.currentTime();
      var _m_down = parseNumber(Math.floor(_countDownTime / 60));
      var _s_down = parseNumber(Math.floor(_countDownTime % 60));
      return _m_down + ':' + _s_down;
    }
  }, {
    key: 'GetTimeMax',
    value: function GetTimeMax() {
      function parseNumber(num) {
        if (typeof num === 'number') num = String(num);
        if (num < 10) return '0' + num;
        if (num >= 10) return num;
      }
      var _m_max = parseNumber(Math.floor(this.Player.duration() / 60));
      var _s_max = parseNumber(Math.floor(this.Player.duration() % 60));
      return _m_max + ':' + _s_max;
    }
  }, {
    key: 'GetInfo',
    value: function GetInfo() {
      return this.PlayerMediaInfo;
    }
  }, {
    key: 'GetTimeRatio',
    value: function GetTimeRatio() {
      return Math.floor(this.Player.currentTime() / this.Player.duration() * 1000) / 1000;
    }
  }, {
    key: 'GetTimePar',
    value: function GetTimePar() {
      return Math.floor(this.Player.currentTime() / this.Player.duration() * 1000) / 10 + '%';
    }
  }, {
    key: 'GetUrlPoster',
    value: function GetUrlPoster() {
      return this.Player.poster();
    }
  }, {
    key: 'SetInfo',
    value: function SetInfo() {
      this.$uiDisplayPoster.innerHTML = this.PlayerMediaInfo.name;
    }
  }, {
    key: 'SetUrlPoster',
    value: function SetUrlPoster(url) {
      this.Player.poster(url);
    }
  }, {
    key: 'Destroy',
    value: function Destroy() {
      this.Player.reset();
    }
  }]);

  return PLAYER_MODULE_BRIGHTCOVE;
}();