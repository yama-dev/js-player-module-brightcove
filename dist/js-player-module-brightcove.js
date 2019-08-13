!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.PLAYER_MODULE_BRIGHTCOVE=t():e.PLAYER_MODULE_BRIGHTCOVE=t()}(window,function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(e,t,i){window,e.exports=function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return n(e,[{key:"isDom",value:function(e){try{return e instanceof HTMLElement}catch(e){return!1}}},{key:"isStr",value:function(e){try{return"string"==typeof e}catch(e){return!1}}},{key:"selectDom",value:function(e){if(!e)return!1;var t=void 0;if(!Array.isArray(e)&&!e.length||this.isStr(e))t=this.isDom(e)?Array(e):Array.prototype.slice.call(document.querySelectorAll(e));else{if(!this.isDom(e[0]))return!1;t=Array.prototype.slice.call(e)}return 0===t.length&&(t=null),t}},{key:"hasClass",value:function(e,t){return this.isDom(e)?e.classList.contains(t):document.querySelector(e).classList.contains(t)}},{key:"addClass",value:function(e,t){var i=this.selectDom(e);if(!i)return!1;i.map(function(e){e.classList.add(t)})}},{key:"removeClass",value:function(e,t){var i=this.selectDom(e);if(!i)return!1;i.map(function(e){e.classList.remove(t)})}},{key:"toggleClass",value:function(e,t){var i=this.selectDom(e);if(!i)return!1;i.map(function(e){e.classList.toggle(t)})}},{key:"setHtml",value:function(e,t){var i=this.selectDom(e);if(!i)return!1;i.map(function(e){e.innerHTML=t})}},{key:"appendHtml",value:function(e,t){var i=this.selectDom(e);if(!i)return!1;i.map(function(e){e.innerHTML+=t})}},{key:"addEvent",value:function(e,t,i){if(e===window)window.addEventListener(t,i);else{var n=this.selectDom(e);if(!n)return!1;n.map(function(e){e.addEventListener(t,i)})}}},{key:"removeEvent",value:function(e,t,i){if(e===window)window.removeEventListener(t,i);else{var n=this.selectDom(e);if(!n)return!1;n.map(function(e){e.removeEventListener(t,i)})}}},{key:"setStyle",value:function(e,t){var i=this.selectDom(e);if(!i)return!1;i.map(function(e){var i="";Object.keys(t).forEach(function(e){i+=e.replace(/([A-Z])/g,"-$1").toLowerCase()+":"+t[e]+";"}),e.setAttribute("style",i)})}}]),e}();
/*!
 * JS DOM (JavaScript Library)
 *   js-dom.js
 * Version 0.0.6
 * Repository https://github.com/yama-dev/js-dom
 * Copyright yama-dev
 * Licensed under the MIT license.
 */t.default=a}]).default},function(e,t,i){"use strict";function n(e,t,i=!0){if(!e)return!1;for(let i in t){new RegExp("({{.?"+i+".?}})","g");let n=new RegExp("{{.?("+i+").?}}","g");e.match(n);let a=RegExp.$1;e=e.replace(n,t[a])}i&&(e=e.replace(/({{.*}})/g,""));let n="";return n=e}i.r(t);var a="//players.brightcove.net/{{ account }}/{{ player }}_default/index.min.js",s='\n<video id="{{ player_id }}"\n  data-video-id="{{ videoid }}"\n  data-account="{{ account }}"\n  data-player="{{ player }}"\n  data-embed="default"\n  data-application-id\n  class="video-js"\n  width="{{ width }}"\n  height="{{ height }}"\n  {{ui_controls}}\n  {{ui_autoplay}}\n  {{playsinline}}\n  {{loop}}\n  {{muted}}\n></video>\n',o='\n  <div class="display_time">00:00</div>\n  <div class="display_time_now">00</div>\n  <div class="display_time_total">00</div>\n  <div class="display_time_par">0%</div>\n  <button class="btn_play btn">play</button>\n  <button class="btn_pause btn">pause</button>\n  <button class="btn_stop btn">stop</button>\n  <button class="btn_mute btn">mute</button>\n  <button class="btn_full btn">full screen</button>\n  <div class="seekbar_time"><div class="seekbar_time_bg"></div><span></span></div>\n  <div class="seekbar_vol"><div class="seekbar_vol_bg"></div><span></span></div>\n  <button class="btn_volon btn">volume on</button>\n  <button class="btn_voloff btn">volume off</button>\n  <div class="display_poster"><img src="" alt=""></div>\n  <div class="display_poster_background"></div>\n  <div class="display_name"></div>\n',l="\n#{{ id }} {\n  position: relative;\n}\n#{{ id }} .on {\n  display: none;\n}\n#{{ id }} .off {\n  display: block;\n}\n#{{ id }} .btn_play {\n  width: 120px;\n  display: block;\n  cursor: pointer;\n}\n#{{ id }} .btn_play.active {\n  display: none;\n}\n#{{ id }} .btn_play:hover .on {\n  display: block;\n}\n#{{ id }} .btn_play:hover .off {\n  display: none;\n}\n#{{ id }} .btn_pause {\n  width: 120px;\n  display: none;\n  cursor: pointer;\n}\n#{{ id }} .btn_pause.active {\n  display: block;\n}\n#{{ id }} .btn_pause:hover .on {\n  display: block;\n}\n#{{ id }} .btn_pause:hover .off {\n  display: none;\n}\n#{{ id }} .btn_stop {\n  width: 120px;\n  cursor: pointer;\n}\n#{{ id }} .btn_stop.active {\n  display: block;\n}\n#{{ id }} .btn_stop:hover .on {\n  display: block;\n}\n#{{ id }} .btn_stop:hover .off {\n  display: none;\n}\n#{{ id }} .btn_mute {\n  width: 120px;\n  cursor: pointer;\n}\n#{{ id }} .btn_mute.active .on {\n  display: block;\n}\n#{{ id }} .btn_mute.active .off {\n  display: none;\n}\n#{{ id }} .seekbar_vol {\n  width: 100%;\n  height: 13px;\n  padding: 4px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#{{ id }} .seekbar_vol .seekbar_vol_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 4px 0;\n}\n#{{ id }} .seekbar_vol span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n#{{ id }} .seekbar_time {\n  width: 100%;\n  height: 13px;\n  padding: 4px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#{{ id }} .seekbar_time .seekbar_time_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 4px 0;\n}\n#{{ id }} .seekbar_time span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n#{{ id }} .display_poster img {\n  max-width: 100%;\n}\n",r=i(0),u=i.n(r),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();
/*!
 * JS PLAYER MODULE BRIGHTCOVE (JavaScript Library)
 *   js-player-module-brightcove.js
 * Version 3.2.0
 * Repository https://github.com/yama-dev/js-player-module-brightcove
 * Copyright yama-dev
 * Licensed under the MIT license.
 */
var c=new u.a,y=function(){function e(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.VERSION="3.2.0",this.PlayerChangeLoadFlg=!0,!i.id||!i.videoid)return console.log("Inadequate parameters (id, videoid)"),!1;this.CONFIG={mode:i.mode||"movie",id:i.id||"pmb",player_id:i.id+"_player"||!1,player_id_wrap:i.id+"_player_wrap"||!1,player_ui_id:i.id+"_ui"||!1,player_style_id:i.id+"_style"||!1,videoid:i.videoid||"",account:i.account||"",width:i.width||"",height:i.height||"",player:i.player||"default",volume:i.volume||1,playsinline:!1!==i.playsinline?"webkit-playsinline playsinline":"",loop:!0===i.loop?"loop":"",muted:!0===i.muted?"muted":"",ui_controls:!0===i.ui_controls?"controls":"",ui_autoplay:!0===i.ui_autoplay?"autoplay":"",ui_default:!1!==i.ui_default,ui_default_css:!1!==i.ui_default_css,stop_outfocus:!0===i.stop_outfocus,poster:i.poster||null,add_style:i.add_style||""},i.on||(i.on={}),this.on={Init:i.on.Init||"",PlayPrep:i.on.PlayPrep||"",Play:i.on.Play||"",Pause:i.on.Pause||"",Stop:i.on.Stop||"",PauseAll:i.on.PauseAll||"",StopAll:i.on.StopAll||"",Change:i.on.Change||""},this.PlayerMediaInfo={},this.Player="",this.$playerElem=c.selectDom("#"+this.CONFIG.id),this.playerHtml=s,this.playerUiHtml=o,this.playerCss=l,this.playerCssOption="",this.playerScriptCode=a,"audio"==this.CONFIG.mode&&(this.CONFIG.width=1,this.CONFIG.height=1),this.playerHtml=n(this.playerHtml,this.CONFIG),this.playerCss=n(this.playerCss,this.CONFIG),this.playerScriptCode=n(this.playerScriptCode,this.CONFIG),"audio"==this.CONFIG.mode&&(this.playerCssOption+="#"+this.CONFIG.player_id+" { opacity: 0; }"),this.CONFIG.add_style&&(this.playerCssOption+=this.CONFIG.add_style),"complete"==document.readyState?this.BuildPlayer():document.addEventListener("DOMContentLoaded",function(e){t.BuildPlayer()})}return h(e,[{key:"BuildPlayer",value:function(){var e=document.createElement("div");e.innerHTML=this.playerUiHtml,this.CONFIG.ui_default&&this.$playerElem[0].insertBefore(e,this.$playerElem[0].firstElementChild);var t=document.createElement("div"),i=document.createElement("div");t.id=this.CONFIG.player_id,i.id=this.CONFIG.player_id_wrap,t.innerHTML=this.playerHtml,i.appendChild(t),this.$playerElem[0].insertBefore(i,this.$playerElem[0].firstElementChild);var n=document.createElement("style");n.innerHTML=this.playerCss,n.id=this.CONFIG.id+"_scripttag",this.CONFIG.ui_default_css?(n.innerHTML=this.playerCss,n.innerHTML+=this.playerCssOption,c.selectDom("#"+this.CONFIG.id+" #"+this.CONFIG.player_style_id)||this.$playerElem[0].appendChild(n)):(n.innerHTML=this.playerCssOption,c.selectDom("#"+this.CONFIG.id+" #"+this.CONFIG.player_style_id)||this.$playerElem[0].appendChild(n)),this.CacheElement();var a=document.createElement("script");a.id=this.CONFIG.id+"_scripttag",a.src=this.playerScriptCode,document.body.appendChild(a),a.onload=this.PlayerInstance()}},{key:"PlayerInstance",value:function(){var e=this,t=this,i=!1,n=0,a=setInterval(function(){try{videojs(e.CONFIG.player_id).mediainfo.name,videojs(e.CONFIG.player_id).mediainfo.name&&(i=!0)}catch(e){i=!1}n>=100?(clearInterval(a),console.log("ERROR: not movie loaded.")):i&&(clearInterval(a),e.Player=videojs(e.CONFIG.player_id),e.PlayerJson=e.Player.toJSON(),e.PlayerMediaInfo=e.Player.mediainfo,e.EventPlay(),e.EventPause(),e.EventStop(),e.EventMute(),e.EventVolon(),e.EventVoloff(),e.EventBtnFull(),e.EventSeekbarVol(),e.EventSeekbarTime(),e.EventChangeVideo(),e.AddGlobalObject(),videojs(e.CONFIG.player_id).on("loadedmetadata",function(){e.SetVolume(),e.SetInfo(),e.SetPoster(),e.Update(),t.on.Init&&"function"==typeof t.on.Init&&t.on.Init(t,t.Player)}),videojs(e.CONFIG.player_id).on("timeupdate",function(){e.Update()}),videojs(e.CONFIG.player_id).on("volumechange",function(){c.setStyle(e.$uiSeekbarVolCover,{width:100*e.Player.volume()+"%"})}),videojs(e.CONFIG.player_id).on("ended",function(){e.Stop()}),videojs(e.CONFIG.player_id).on("error",function(t){console.log(e.error().code)})),n++},100)}},{key:"AddGlobalObject",value:function(){void 0===window.PLAYER_MODULE_ALL_PLATLIST?(window.PLAYER_MODULE_ALL_PLATLIST=[],window.PLAYER_MODULE_ALL_PLATLIST.push({instance:this,Player:this.Player,videoid:this.CONFIG.videoid,id:this.CONFIG.id,player_id:this.CONFIG.player_id})):window.PLAYER_MODULE_ALL_PLATLIST.push({instance:this,Player:this.Player,videoid:this.CONFIG.videoid,id:this.CONFIG.id,player_id:this.CONFIG.player_id})}},{key:"CacheElement",value:function(){this.$playerElem=c.selectDom("#"+this.CONFIG.id),this.$playerElemMain=c.selectDom("#"+this.CONFIG.id+" #"+this.CONFIG.player_id),this.$playerElemMainWrap=c.selectDom("#"+this.CONFIG.id+" #"+this.CONFIG.player_id_wrap),this.$uiBtnPlay=c.selectDom("#"+this.CONFIG.id+" .btn_play"),this.$uiBtnStop=c.selectDom("#"+this.CONFIG.id+" .btn_stop"),this.$uiBtnPause=c.selectDom("#"+this.CONFIG.id+" .btn_pause"),this.$uiBtnMute=c.selectDom("#"+this.CONFIG.id+" .btn_mute"),this.$uiBtnVolon=c.selectDom("#"+this.CONFIG.id+" .btn_volon"),this.$uiBtnVoloff=c.selectDom("#"+this.CONFIG.id+" .btn_voloff"),this.$uiBtnFull=c.selectDom("#"+this.CONFIG.id+" .btn_full"),this.$uiDisplayTime=c.selectDom("#"+this.CONFIG.id+" .display_time"),this.$uiDisplayTimeNow=c.selectDom("#"+this.CONFIG.id+" .display_time_now"),this.$uiDisplayTimeTotal=c.selectDom("#"+this.CONFIG.id+" .display_time_total"),this.$uiDisplayTimeDown=c.selectDom("#"+this.CONFIG.id+" .display_time_down"),this.$uiDisplayTimePar=c.selectDom("#"+this.CONFIG.id+" .display_time_par"),this.$uiDisplayPoster=c.selectDom("#"+this.CONFIG.id+" .display_poster"),this.$uiDisplayPosterBg=c.selectDom("#"+this.CONFIG.id+" .display_poster_background"),this.$uiDisplayName=c.selectDom("#"+this.CONFIG.id+" .display_name"),this.$uiSeekbarVol=c.selectDom("#"+this.CONFIG.id+" .seekbar_vol"),this.$uiSeekbarVolBg=c.selectDom("#"+this.CONFIG.id+" .seekbar_vol .seekbar_vol_bg"),this.$uiSeekbarVolCover=c.selectDom("#"+this.CONFIG.id+" .seekbar_vol span"),this.$uiSeekbarTime=c.selectDom("#"+this.CONFIG.id+" .seekbar_time"),this.$uiSeekbarTimeBg=c.selectDom("#"+this.CONFIG.id+" .seekbar_time .seekbar_time_bg"),this.$uiSeekbarTimeCover=c.selectDom("#"+this.CONFIG.id+" .seekbar_time span"),this.$uiBtnChange=c.selectDom("#"+this.CONFIG.id+" .btn_change"),this.$uiBtnChangeDisplayTime=c.selectDom("#"+this.CONFIG.id+" .display_time"),this.$uiBtnChangeDisplayTimeDown=c.selectDom("#"+this.CONFIG.id+" .display_time_down"),this.$uiBtnDataId=c.selectDom("[data-PMB-id]")}},{key:"EventPlay",value:function(){var e=this;this.$uiBtnPlay&&c.addEvent(this.$uiBtnPlay,"click",function(t){e.Player.paused()?e.Play():e.Pause()})}},{key:"EventPause",value:function(){var e=this;this.$uiBtnPause&&c.addEvent(this.$uiBtnPause,"click",function(t){e.Pause()})}},{key:"EventStop",value:function(){var e=this;this.$uiBtnStop&&c.addEvent(this.$uiBtnStop,"click",function(t){e.Stop()}),c.addEvent(window,"blur",function(t){e.CONFIG.stop_outfocus&&e.Stop()})}},{key:"EventMute",value:function(){var e=this;this.$uiBtnMute&&c.addEvent(this.$uiBtnMute,"click",function(t){e.Mute()})}},{key:"EventVolon",value:function(){var e=this;this.$uiBtnVolon&&c.addEvent(this.$uiBtnVolon,"click",function(t){e.SetVolume(e.CONFIG.volume),c.removeClass(e.$uiBtnVolon,"active")})}},{key:"EventVoloff",value:function(){var e=this;this.$uiBtnVoloff&&c.addEvent(this.$uiBtnVoloff,"click",function(t){e.SetVolume(0),c.addClass(e.$uiBtnVoloff,"active")})}},{key:"EventSeekbarVol",value:function(){var e=this;if(this.$uiSeekbarVol){var t=!1,i=0;c.setStyle(this.$uiSeekbarVolCover,{width:"100%"}),c.addEvent(this.$uiSeekbarVol,"mousedown",function(n){t=!0;var a=n.currentTarget.clientWidth,s=n.currentTarget.getBoundingClientRect().left;i=(n.pageX-s)/a,e.SetVolume(i)}),c.addEvent(this.$uiSeekbarVol,"mouseleave",function(e){t=!1}),c.addEvent(this.$uiSeekbarVol,"mouseup",function(e){t=!1}),c.addEvent(this.$uiSeekbarVol,"mousemove",function(n){if(!0===t){var a=n.currentTarget.clientWidth,s=n.currentTarget.getBoundingClientRect().left;i=(n.pageX-s)/a,e.Player.muted()&&(e.CONFIG.muted=!1,e.Player.muted(!1)),e.SetVolume(i)}})}}},{key:"EventSeekbarTime",value:function(){var e=this;if(this.$uiSeekbarTime){var t=0;c.addEvent(this.$uiSeekbarTime,"mousedown",function(i){e.PlayerChangeSeekingFlg=!0;var n=i.currentTarget.clientWidth,a=i.currentTarget.getBoundingClientRect().left,s=(i.pageX-a)/n;t=e.Player.duration()*s,c.setStyle(e.$uiSeekbarTimeCover,{width:100*s+"%"}),e.Player.currentTime(t)}),c.addEvent(this.$uiSeekbarTime,"mouseleave",function(t){e.PlayerChangeSeekingFlg&&(e.Play(),setTimeout(function(){e.Play(),e.PlayerChangeSeekingFlg=!1},100))}),c.addEvent(this.$uiSeekbarTime,"mouseup",function(t){e.PlayerChangeSeekingFlg&&(e.Play(),setTimeout(function(){e.Play(),e.PlayerChangeSeekingFlg=!1},100))}),c.addEvent(this.$uiSeekbarTime,"mousemove",function(t){if(e.PlayerChangeSeekingFlg){var i=t.currentTarget.clientWidth,n=t.currentTarget.getBoundingClientRect().left,a=(t.pageX-n)/i,s=e.Player.duration()*a;c.setStyle(e.$uiSeekbarTimeCover,{width:100*a+"%"}),e.Player.currentTime(s)}})}}},{key:"EventChangeVideo",value:function(){var e=this;this.$uiBtnChange&&c.addEvent(this.$uiBtnChange,"click",function(t){var i=t.currentTarget.dataset.pmbId;e.Change(i)})}},{key:"EventBtnFull",value:function(){var e=this;this.$uiBtnFull&&c.addEvent(this.$uiBtnFull,"click",function(t){e.Fullscreen()})}},{key:"ClassOn",value:function(){var e=this;this.$uiBtnPlay&&c.addClass(this.$uiBtnPlay,"active"),this.$uiBtnPause&&c.addClass(this.$uiBtnPause,"active"),this.$uiBtnDataId&&this.$uiBtnDataId.map(function(t,i){e.CONFIG.videoid==t.getAttribute("data-PMB-id")&&c.addClass(t,"active")})}},{key:"ClassOff",value:function(){this.$uiBtnPlay&&c.removeClass(this.$uiBtnPlay,"active"),this.$uiBtnPause&&c.removeClass(this.$uiBtnPause,"active"),this.$uiBtnDataId&&c.removeClass(this.$uiBtnDataId,"active")}},{key:"Update",value:function(){this.PlayerChangeSeekingFlg||(this.PlayerChangeLoadFlg?(this.$uiDisplayTime&&c.setHtml(this.$uiDisplayTime,this.GetTime()+"/"+this.GetTimeMax()),this.$uiDisplayTimeNow&&c.setHtml(this.$uiDisplayTimeNow,this.GetTime()),this.$uiDisplayTimeTotal&&c.setHtml(this.$uiDisplayTimeTotal,this.GetTimeMax()),this.$uiDisplayTimeDown&&c.setHtml(this.$uiDisplayTimeDown,this.GetTimeDown()),this.$uiBtnChangeDisplayTime&&c.setHtml(this.$uiBtnChangeDisplayTime,this.GetTime()+"/"+this.GetTimeMax()),this.$uiBtnChangeDisplayTimeDown&&c.setHtml(this.$uiBtnChangeDisplayTimeDown,this.GetTimeDown()),this.$uiDisplayTimePar&&c.setHtml(this.$uiDisplayTimePar,this.GetTimePar()),this.$uiSeekbarTimeCover&&(this.$uiSeekbarTimeCover[0].style.width=this.GetTimePar())):(this.$uiDisplayTime&&c.setHtml(this.$uiDisplayTime,"00:00"),this.$uiDisplayTimeNow&&c.setHtml(this.$uiDisplayTimeNow,"00:00"),this.$uiDisplayTimeTotal&&c.setHtml(this.$uiDisplayTimeTotal,"00:00"),this.$uiDisplayTimeDown&&c.setHtml(this.$uiDisplayTimeDown,"00:00"),this.$uiBtnChangeDisplayTime&&c.setHtml(this.$uiBtnChangeDisplayTime,"00:00"),this.$uiBtnChangeDisplayTimeDown&&c.setHtml(this.$uiBtnChangeDisplayTimeDown,"00:00"),this.$uiDisplayTimePar&&c.setHtml(this.$uiDisplayTimePar,"0%"),this.$uiSeekbarTimeCover&&(this.$uiSeekbarTimeCover[0].style.width="0%")))}},{key:"Play",value:function(e){(this.$uiBtnPlay||this.$uiBtnDataId)&&(this.Player.paused()?(!this.on.PlayPrep&&e&&(this.on.PlayPrep=e),this.on.PlayPrep&&"function"==typeof this.on.PlayPrep&&this.on.PlayPrep(this,this.Player),this.Player.play(),this.ClassOn(),!this.on.Play&&e&&(this.on.Play=e),this.on.Play&&"function"==typeof this.on.Play&&this.on.Play(this,this.Player)):(this.Pause(),this.ClassOff()))}},{key:"Stop",value:function(e){this.Player.pause(),this.Player.currentTime(0),this.ClassOff(),!this.on.Stop&&e&&(this.on.Stop=e),this.on.Stop&&"function"==typeof this.on.Stop&&this.on.Stop(this,this.Player)}},{key:"Pause",value:function(e){this.Player.pause(),this.ClassOff(),!this.on.Pause&&e&&(this.on.Pause=e),this.on.Pause&&"function"==typeof this.on.Pause&&this.on.Pause(this,this.Player)}},{key:"Mute",value:function(){this.Player.muted()?(this.CONFIG.muted=!1,this.Player.muted(!1),this.SetVolume(this.CONFIG.volume),c.removeClass(this.$uiBtnMute,"active")):(this.CONFIG.muted=!0,this.Player.muted(!0),this.Player.volume(0),c.addClass(this.$uiBtnMute,"active"))}},{key:"Change",value:function(e,t){var i=this;if(""!=e&&null!=e&&null!=e)if(this.CONFIG.videoid!==e){this.PlayerChangeLoadFlg=!1,this.CONFIG.videoid=e;var n=window.navigator.userAgent.toLowerCase();-1==n.indexOf("msie")&&-1==n.indexOf("trident")&&-1==n.indexOf("edge")&&this.Player.currentTime(0),this.Player.muted(!0),this.Player.play(),this.Player.catalog.getVideo(e,function(e,n){i.Player.catalog.load(n),i.PlayerMediaInfo=i.Player.mediainfo,i.SetInfo(),i.SetPoster(),setTimeout(function(){i.Player.play(),i.Player.muted(!1),i.ClassOff(),i.ClassOn()},100),setTimeout(function(){i.PlayerChangeLoadFlg=!0,!i.on.Change&&t&&(i.on.Change=t),i.on.Change&&"function"==typeof i.on.Change&&i.on.Change(i,i.Player)},300)}),this.Player.on("loadeddata",function(){i.PlayerChangeLoadFlg=!0,i.Player.off("loadeddata")})}else this.Play(),!this.on.Change&&t&&(this.on.Change=t),this.on.Change&&"function"==typeof this.on.Change&&this.on.Change(this,this.Player)}},{key:"PauseAll",value:function(e){window.PLAYER_MODULE_ALL_PLATLIST.map(function(e,t){e.instance.Pause()}),!this.on.PauseAll&&e&&(this.on.PauseAll=e),this.on.PauseAll&&"function"==typeof this.on.PauseAll&&this.on.PauseAll(this,this.Player)}},{key:"StopAll",value:function(e){window.PLAYER_MODULE_ALL_PLATLIST.map(function(e,t){e.instance.Stop()}),!this.on.StopAll&&e&&(this.on.StopAll=e),this.on.StopAll&&"function"==typeof this.on.StopAll&&this.on.StopAll(this,this.Player)}},{key:"SeekTo",value:function(e){return!!e&&("object"!=(void 0===e?"undefined":d(e))&&"function"!=typeof e&&("string"==typeof e&&(e=Number(e)),!!e&&void this.Player.currentTime(e)))}},{key:"GetTime",value:function(){function e(e){return"number"==typeof e&&(e=String(e)),e<10?"0"+e:e>=10?e:void 0}var t=e(Math.floor(this.Player.currentTime()/60)),i=e(Math.floor(this.Player.currentTime()%60));return isFinite(i)&&isFinite(t)?t+":"+i:"00:00"}},{key:"GetTimeDown",value:function(){function e(e){return"number"==typeof e&&(e=String(e)),e<10?"0"+e:e>=10?e:void 0}var t=this.Player.duration()-this.Player.currentTime(),i=e(Math.floor(t/60)),n=e(Math.floor(t%60));return isFinite(n)&&isFinite(i)?i+":"+n:"00:00"}},{key:"GetTimeMax",value:function(){function e(e){return"number"==typeof e&&(e=String(e)),e<10?"0"+e:e>=10?e:void 0}return e(Math.floor(this.Player.duration()/60))+":"+e(Math.floor(this.Player.duration()%60))}},{key:"GetTimeRatio",value:function(){return Math.floor(this.Player.currentTime()/this.Player.duration()*1e3)/1e3}},{key:"GetTimePar",value:function(){var e=Math.floor(this.Player.currentTime()/this.Player.duration()*1e3)/10;return isFinite(e)?e+"%":"0%"}},{key:"SetPoster",value:function(e){e?this.Player.poster(e):(0!=this.CONFIG.poster&&(this.CONFIG.poster=this.Player.poster()),this.$uiDisplayPoster&&("audio"==this.CONFIG.mode?c.setHtml(this.$uiDisplayPoster,""):c.setHtml(this.$uiDisplayPoster,'<img src="'+this.CONFIG.poster+'" alt="">')),this.$uiDisplayPosterBg&&"audio"!=this.CONFIG.mode&&c.setStyle(this.$uiDisplayPosterBg,{backgroundImage:"url("+this.CONFIG.poster+")"}))}},{key:"SetVolume",value:function(e){this.CONFIG.volume=e||this.CONFIG.volume,this.Player.volume(this.CONFIG.volume)}},{key:"SetInfo",value:function(){this.$uiDisplayName&&c.setHtml(this.$uiDisplayName,this.PlayerMediaInfo.name)}},{key:"Destroy",value:function(){this.Player.reset()}}]),e}();t.default=y}]).default});