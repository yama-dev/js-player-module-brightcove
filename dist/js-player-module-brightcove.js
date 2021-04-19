/*! @yama-dev/js-player-module-brightcove version:5.3.1 repository:https://github.com/yama-dev/js-player-module-brightcove copyright:yama-dev licensed:MIT */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var n in i)("object"==typeof exports?exports:e)[n]=i[n]}}(window,(function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";function n(e){try{return e instanceof HTMLElement}catch(e){return!1}}function a(e){if(!e)return!1;var t;if(!Array.isArray(e)&&!e.length||function(e){try{return"string"==typeof e}catch(e){return!1}}(e))t=n(e)?Array(e):Array.prototype.slice.call(document.querySelectorAll(e));else{if(!n(e[0]))return!1;t=Array.prototype.slice.call(e)}return 0===t.length&&(t=null),t}function o(e,t){var i=a(e);if(!i)return!1;i.map((function(e){e.classList.add(t)}))}function s(e,t){var i=a(e);if(!i)return!1;i.map((function(e){e.classList.remove(t)}))}function l(e,t,i){if(e===window)window.addEventListener(t,i,{passive:!1});else{var n=a(e);if(!n)return!1;n.map((function(e){e.addEventListener(t,i,{passive:!1})}))}}function r(e,t){var i=a(e);if(!i)return!1;i.map((function(e){e.innerHTML=t}))}function u(e,t){var i=a(e);if(!i)return!1;i.map((function(e){var i="";Object.keys(t).forEach((function(e){null!==t[e]&&(i+=e.replace(/([A-Z])/g,"-$1").toLowerCase()+": "+t[e]+";")})),e.setAttribute("style",i)}))}function h(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!e)return!1;for(var n in t){new RegExp("({{.?"+n+".?}})","g");var a=new RegExp("{{.?("+n+").?}}","g");e.match(a);var o=RegExp.$1;e=e.replace(a,t[o])}i&&(e=e.replace(/({{.*}})/g,""));return e}i.r(t),i.d(t,"PLAYER_MODULE_BRIGHTCOVE",(function(){return P}));var d="//players.brightcove.net/{{ account }}/{{ player }}_default/index.min.js",y='\n<video id="{{ player_id }}"\n  data-video-id="{{ videoid }}"\n  data-account="{{ account }}"\n  data-player="{{ player }}"\n  data-embed="default"\n  data-application-id\n  class="video-js"\n  width="{{ width }}"\n  height="{{ height }}"\n  {{ui_controls}}\n  {{ui_autoplay}}\n  {{playsinline}}\n  {{loop}}\n  {{muted}}\n></video>\n',p='\n  <div class="display_time">00:00</div>\n  <div class="display_time_now">00</div>\n  <div class="display_time_total">00</div>\n  <div class="display_time_par">0%</div>\n  <button class="btn_play btn">play</button>\n  <button class="btn_pause btn">pause</button>\n  <button class="btn_stop btn">stop</button>\n  <button class="btn_mute btn">mute</button>\n  <button class="btn_full btn">full screen</button>\n  <div class="seekbar_time"><div class="seekbar_time_bg"></div><span></span></div>\n  <div class="seekbar_vol"><div class="seekbar_vol_bg"></div><span></span></div>\n  <button class="btn_volon btn">volume on</button>\n  <button class="btn_voloff btn">volume off</button>\n  <div class="display_poster"><img src="" alt=""></div>\n  <div class="display_poster_background"></div>\n  <div class="display_name"></div>\n',c="\n#{{ id }} {\n  position: relative;\n}\n#{{ id }} .on {\n  display: none;\n}\n#{{ id }} .off {\n  display: block;\n}\n#{{ id }} .btn_play {\n  width: 120px;\n  display: block;\n  cursor: pointer;\n}\n#{{ id }} .btn_play.active {\n  display: none;\n}\n#{{ id }} .btn_play:hover .on {\n  display: block;\n}\n#{{ id }} .btn_play:hover .off {\n  display: none;\n}\n#{{ id }} .btn_pause {\n  width: 120px;\n  display: none;\n  cursor: pointer;\n}\n#{{ id }} .btn_pause.active {\n  display: block;\n}\n#{{ id }} .btn_pause:hover .on {\n  display: block;\n}\n#{{ id }} .btn_pause:hover .off {\n  display: none;\n}\n#{{ id }} .btn_stop {\n  width: 120px;\n  cursor: pointer;\n}\n#{{ id }} .btn_stop.active {\n  display: block;\n}\n#{{ id }} .btn_stop:hover .on {\n  display: block;\n}\n#{{ id }} .btn_stop:hover .off {\n  display: none;\n}\n#{{ id }} .btn_mute {\n  width: 120px;\n  cursor: pointer;\n}\n#{{ id }} .btn_mute.active .on {\n  display: block;\n}\n#{{ id }} .btn_mute.active .off {\n  display: none;\n}\n#{{ id }} .seekbar_vol {\n  width: 100%;\n  height: 13px;\n  padding: 4px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#{{ id }} .seekbar_vol .seekbar_vol_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 4px 0;\n}\n#{{ id }} .seekbar_vol span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n#{{ id }} .seekbar_time {\n  width: 100%;\n  height: 13px;\n  padding: 4px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#{{ id }} .seekbar_time .seekbar_time_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 4px 0;\n}\n#{{ id }} .seekbar_time span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n#{{ id }} .display_poster img {\n  max-width: 100%;\n}\n";function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var P=function(){function e(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(f(this,e),this.VERSION="5.3.1",this.PlayerChangeLoadFlg=!0,!i.id||!i.videoid)return!1;this.CONFIG={mode:i.mode||"movie",id:i.id||"pmb",player_id:"".concat(i.id,"_player")||!1,player_id_wrap:"".concat(i.id,"_player_wrap")||!1,player_ui_id:"".concat(i.id,"_ui")||!1,player_style_id:"".concat(i.id,"_style")||!1,videoid:i.videoid||"",account:i.account||"",width:i.width||"",height:i.height||"",player:i.player||"default",volume:i.volume||1,playsinline:!1!==i.playsinline?"webkit-playsinline playsinline":"",loop:!0===i.loop?"loop":"",muted:!0===i.muted?"muted":"",ui_controls:!0===i.ui_controls?"controls":"",ui_autoplay:!0===i.ui_autoplay?"autoplay":"",ui_default:!1!==i.ui_default,ui_default_css:!1!==i.ui_default_css,stop_outfocus:!0===i.stop_outfocus,poster:i.poster||null,add_style:i.add_style||"",classname_active_wrap:i.classname_active_wrap||"is-pmb-wrap",classname_active:i.classname_active||"active"},i.on||(i.on={}),this.on={PlayerInit:i.on.PlayerInit||"",PlayerEnded:i.on.PlayerEnded||"",PlayerPlay:i.on.PlayerPlay||"",PlayerPause:i.on.PlayerPause||"",TimeUpdate:i.on.TimeUpdate||"",VolumeChange:i.on.VolumeChange||"",PlayPrep:i.on.PlayPrep||"",Play:i.on.Play||"",Pause:i.on.Pause||"",Stop:i.on.Stop||"",PauseAll:i.on.PauseAll||"",StopAll:i.on.StopAll||"",Change:i.on.Change||""},this.PlayerMediaInfo={},this.Player="",this.$={},this.$.playerElem=a("#".concat(this.CONFIG.id)),this.playerHtml=y,this.playerUiHtml=p,this.playerCss=c,this.playerCssOption="",this.playerScriptCode=d,"audio"==this.CONFIG.mode&&(this.CONFIG.width=1,this.CONFIG.height=1),this.playerHtml=h(this.playerHtml,this.CONFIG),this.playerCss=h(this.playerCss,this.CONFIG),this.playerScriptCode=h(this.playerScriptCode,this.CONFIG),"audio"==this.CONFIG.mode&&(this.playerCssOption+="#".concat(this.CONFIG.player_id," { opacity: 0; }")),this.CONFIG.add_style&&(this.playerCssOption+=this.CONFIG.add_style),"complete"==document.readyState||"interactive"==document.readyState?this.BuildPlayer():document.addEventListener("DOMContentLoaded",(function(){t.BuildPlayer()}))}var t,i,n;return t=e,n=[{key:"parseNumber",value:function(e){return"number"==typeof e&&(e=String(e)),e<10?"0"+e:e>=10?e:void 0}},{key:"pad",value:function(e,t,i){return i=i||"0",(e+="").length>=t?e:new Array(t-e.length+1).join(i)+e}},{key:"toFixedNumber",value:function(e,t,i){var n=Math.pow(i||10,t);return Math.round(e*n)/n}}],(i=[{key:"BuildPlayer",value:function(){var e=document.createElement("div");e.innerHTML=this.playerUiHtml,this.CONFIG.ui_default&&this.$.playerElem[0].insertBefore(e,this.$.playerElem[0].firstElementChild);var t=document.createElement("div"),i=document.createElement("div");t.id=this.CONFIG.player_id,i.id=this.CONFIG.player_id_wrap,t.innerHTML=this.playerHtml,i.appendChild(t),this.$.playerElem[0].insertBefore(i,this.$.playerElem[0].firstElementChild);var n=document.createElement("style");n.innerHTML=this.playerCss,n.id=this.CONFIG.id+"_scripttag",this.CONFIG.ui_default_css?(n.innerHTML=this.playerCss,n.innerHTML+=this.playerCssOption,a("#".concat(this.CONFIG.id," #").concat(this.CONFIG.player_style_id))||this.$.playerElem[0].appendChild(n)):(n.innerHTML=this.playerCssOption,a("#".concat(this.CONFIG.id," #").concat(this.CONFIG.player_style_id))||this.$.playerElem[0].appendChild(n)),this.CacheElement();var o=document.createElement("script");o.id="".concat(this.CONFIG.id,"_scripttag"),o.src=this.playerScriptCode+"?"+Date.now(),document.body.appendChild(o),o.onload=this.PlayerInstance()}},{key:"PlayerInstance",value:function(){var t=this,i=this,n=!1,a=0,o=setInterval((function(){try{videojs(t.CONFIG.player_id).mediainfo.name,videojs(t.CONFIG.player_id).mediainfo.name&&(n=!0)}catch(e){n=!1}a>=100?clearInterval(o):n&&(clearInterval(o),function(){t.Player=videojs(t.CONFIG.player_id),t.PlayerJson=t.Player.toJSON(),t.PlayerMediaInfo=t.Player.mediainfo,t.EventPlay(),t.EventPause(),t.EventStop(),t.EventMute(),t.EventVolon(),t.EventVoloff(),t.EventBtnFull(),t.EventSeekbarVol(),t.EventSeekbarTime(),t.EventChangeVideo(),t.AddGlobalObject();var n=!1;t.Player.on("loadedmetadata",(function(){if(n)return!1;n=!0,t.SetVolume(),t.SetInfo(),t.SetPoster(),t.Update(),i.on.PlayerInit&&"function"==typeof i.on.PlayerInit&&i.on.PlayerInit(i,i.Player)})),t.Player.on("loadeddata",(function(){if(n)return!1;n=!0,t.SetVolume(),t.SetInfo(),t.SetPoster(),t.Update(),i.on.PlayerInit&&"function"==typeof i.on.PlayerInit&&i.on.PlayerInit(i,i.Player)})),t.Player.on("timeupdate",(function(){t.Update()})),t.Player.on("volumechange",(function(){var n=t.Player.volume();u(t.$.uiSeekbarVolCover,{width:100*n+"%"}),i.on.VolumeChange&&"function"==typeof i.on.VolumeChange&&i.on.VolumeChange({volume:e.toFixedNumber(n,3),par:e.toFixedNumber(100*n,1)})})),t.Player.on("ended",(function(){t.Stop(),i.on.PlayerEnded&&"function"==typeof i.on.PlayerEnded&&i.on.PlayerEnded(i,i.Player)})),t.Player.on("play",(function(){t.ClassOn(),i.on.PlayerPlay&&"function"==typeof i.on.PlayerPlay&&i.on.PlayerPlay(i,i.Player)})),t.Player.on("pause",(function(){t.ClassOff(),i.on.PlayerPause&&"function"==typeof i.on.PlayerPause&&i.on.PlayerPause(i,i.Player)})),t.Player.on("error",(function(){}))}()),a++}),300)}},{key:"AddGlobalObject",value:function(){void 0===window.PLAYER_MODULE_ALL_PLATLIST?(window.PLAYER_MODULE_ALL_PLATLIST=[],window.PLAYER_MODULE_ALL_PLATLIST.push({instance:this,Player:this.Player,videoid:this.CONFIG.videoid,id:this.CONFIG.id,player_id:this.CONFIG.player_id})):window.PLAYER_MODULE_ALL_PLATLIST.push({instance:this,Player:this.Player,videoid:this.CONFIG.videoid,id:this.CONFIG.id,player_id:this.CONFIG.player_id})}},{key:"CacheElement",value:function(){this.$.playerElem=a("#".concat(this.CONFIG.id)),this.$.playerElemMain=a("#".concat(this.CONFIG.id," #").concat(this.CONFIG.player_id)),this.$.playerElemMainWrap=a("#".concat(this.CONFIG.id," #").concat(this.CONFIG.player_id_wrap)),this.$.uiBtnPlay=a("#"+this.CONFIG.id+" .btn_play"),this.$.uiBtnStop=a("#"+this.CONFIG.id+" .btn_stop"),this.$.uiBtnPause=a("#"+this.CONFIG.id+" .btn_pause"),this.$.uiBtnMute=a("#"+this.CONFIG.id+" .btn_mute"),this.$.uiBtnVolon=a("#"+this.CONFIG.id+" .btn_volon"),this.$.uiBtnVoloff=a("#"+this.CONFIG.id+" .btn_voloff"),this.$.uiBtnFull=a("#"+this.CONFIG.id+" .btn_full"),this.$.uiDisplayTime=a("#"+this.CONFIG.id+" .display_time"),this.$.uiDisplayTimeNow=a("#"+this.CONFIG.id+" .display_time_now"),this.$.uiDisplayTimeTotal=a("#"+this.CONFIG.id+" .display_time_total"),this.$.uiDisplayTimeDown=a("#"+this.CONFIG.id+" .display_time_down"),this.$.uiDisplayTimePar=a("#"+this.CONFIG.id+" .display_time_par"),this.$.uiDisplayPoster=a("#"+this.CONFIG.id+" .display_poster"),this.$.uiDisplayPosterBg=a("#"+this.CONFIG.id+" .display_poster_background"),this.$.uiDisplayName=a("#"+this.CONFIG.id+" .display_name"),this.$.uiSeekbarVol=a("#"+this.CONFIG.id+" .seekbar_vol"),this.$.uiSeekbarVolBg=a("#"+this.CONFIG.id+" .seekbar_vol .seekbar_vol_bg"),this.$.uiSeekbarVolCover=a("#"+this.CONFIG.id+" .seekbar_vol span"),this.$.uiSeekbarTime=a("#"+this.CONFIG.id+" .seekbar_time"),this.$.uiSeekbarTimeBg=a("#"+this.CONFIG.id+" .seekbar_time .seekbar_time_bg"),this.$.uiSeekbarTimeCover=a("#"+this.CONFIG.id+" .seekbar_time span"),this.$.uiBtnChange=a("#"+this.CONFIG.id+" .btn_change"),this.$.uiBtnChangeDisplayTime=a("#"+this.CONFIG.id+" .display_time"),this.$.uiBtnChangeDisplayTimeDown=a("#"+this.CONFIG.id+" .display_time_down"),this.$.uiBtnDataId=a("[data-PMB-id]")}},{key:"EventPlay",value:function(){var e=this;this.$.uiBtnPlay&&l(this.$.uiBtnPlay,"click",(function(){e.Player.paused()?e.Play():e.Pause()}))}},{key:"EventPause",value:function(){var e=this;this.$.uiBtnPause&&l(this.$.uiBtnPause,"click",(function(){e.Pause()}))}},{key:"EventStop",value:function(){var e=this;this.$.uiBtnStop&&l(this.$.uiBtnStop,"click",(function(){e.Stop()})),l(window,"blur",(function(){e.CONFIG.stop_outfocus&&e.Stop()}))}},{key:"EventMute",value:function(){var e=this;this.$.uiBtnMute&&l(this.$.uiBtnMute,"click",(function(){e.Mute()}))}},{key:"EventVolon",value:function(){var e=this;this.$.uiBtnVolon&&l(this.$.uiBtnVolon,"click",(function(){e.SetVolume(e.CONFIG.volume),s(e.$.uiBtnVolon,e.CONFIG.classname_active)}))}},{key:"EventVoloff",value:function(){var e=this;this.$.uiBtnVoloff&&l(this.$.uiBtnVoloff,"click",(function(){e.SetVolume(0),o(e.$.uiBtnVoloff,e.CONFIG.classname_active)}))}},{key:"EventSeekbarVol",value:function(){var e=this;if(this.$.uiSeekbarVol){var t=!1,i=0;u(this.$.uiSeekbarVolCover,{width:"100%"}),l(this.$.uiSeekbarVol,"mousedown",(function(n){t=!0;var a=n.currentTarget.clientWidth,o=n.currentTarget.getBoundingClientRect().left;i=(n.pageX-o)/a,e.SetVolume(i)})),l(this.$.uiSeekbarVol,"mouseleave",(function(){t=!1})),l(this.$.uiSeekbarVol,"mouseup",(function(){t=!1})),l(this.$.uiSeekbarVol,"mousemove",(function(n){if(!0===t){var a=n.currentTarget.clientWidth,o=n.currentTarget.getBoundingClientRect().left;i=(n.pageX-o)/a,e.Player.muted()&&(e.CONFIG.muted=!1,e.Player.muted(!1)),e.SetVolume(i)}}))}}},{key:"EventSeekbarTime",value:function(){var e=this;if(this.$.uiSeekbarTime){var t=0;l(this.$.uiSeekbarTime,"mousedown",(function(i){e.PlayerChangeSeekingFlg=!0;var n=i.currentTarget.clientWidth,a=i.currentTarget.getBoundingClientRect().left,o=(i.pageX-a)/n;t=e.Player.duration()*o,u(e.$.uiSeekbarTimeCover,{width:100*o+"%"}),e.Player.currentTime(t)})),l(this.$.uiSeekbarTime,"mouseleave",(function(){e.PlayerChangeSeekingFlg&&(e.Play(),setTimeout((function(){e.Play(),e.PlayerChangeSeekingFlg=!1}),100))})),l(this.$.uiSeekbarTime,"mouseup",(function(){e.PlayerChangeSeekingFlg&&(e.Play(),setTimeout((function(){e.Play(),e.PlayerChangeSeekingFlg=!1}),100))})),l(this.$.uiSeekbarTime,"mousemove",(function(t){if(e.PlayerChangeSeekingFlg){var i=t.currentTarget.clientWidth,n=t.currentTarget.getBoundingClientRect().left,a=(t.pageX-n)/i,o=e.Player.duration()*a;u(e.$.uiSeekbarTimeCover,{width:100*a+"%"}),e.Player.currentTime(o)}}))}}},{key:"EventChangeVideo",value:function(){var e=this;this.$.uiBtnChange&&l(this.$.uiBtnChange,"click",(function(t){var i=t.currentTarget.dataset.pmbId;e.Change(i)}))}},{key:"EventBtnFull",value:function(){var e=this;this.$.uiBtnFull&&l(this.$.uiBtnFull,"click",(function(){e.Fullscreen()}))}},{key:"ClassOn",value:function(){var e=this;this.$.playerElem&&o(this.$.playerElem,this.CONFIG.classname_active_wrap),this.$.uiBtnPlay&&o(this.$.uiBtnPlay,this.CONFIG.classname_active),this.$.uiBtnPause&&o(this.$.uiBtnPause,this.CONFIG.classname_active),this.$.uiBtnDataId&&this.$.uiBtnDataId.map((function(t){e.CONFIG.videoid==t.getAttribute("data-PMB-id")&&o(t,e.CONFIG.classname_active)}))}},{key:"ClassOff",value:function(){this.$.playerElem&&s(this.$.playerElem,this.CONFIG.classname_active_wrap),this.$.uiBtnPlay&&s(this.$.uiBtnPlay,this.CONFIG.classname_active),this.$.uiBtnPause&&s(this.$.uiBtnPause,this.CONFIG.classname_active),this.$.uiBtnDataId&&s(this.$.uiBtnDataId,this.CONFIG.classname_active)}},{key:"Update",value:function(){this.PlayerChangeSeekingFlg||(this.PlayerChangeLoadFlg?(this.$.uiDisplayTime&&r(this.$.uiDisplayTime,this.GetTime()+"/"+this.GetTimeMax()),this.$.uiDisplayTimeNow&&r(this.$.uiDisplayTimeNow,this.GetTime()),this.$.uiDisplayTimeTotal&&r(this.$.uiDisplayTimeTotal,this.GetTimeMax()),this.$.uiDisplayTimeDown&&r(this.$.uiDisplayTimeDown,this.GetTimeDown()),this.$.uiBtnChangeDisplayTime&&r(this.$.uiBtnChangeDisplayTime,this.GetTime()+"/"+this.GetTimeMax()),this.$.uiBtnChangeDisplayTimeDown&&r(this.$.uiBtnChangeDisplayTimeDown,this.GetTimeDown()),this.$.uiDisplayTimePar&&r(this.$.uiDisplayTimePar,this.GetTimePar()),this.$.uiSeekbarTimeCover&&(this.$.uiSeekbarTimeCover[0].style.width=this.GetTimePar()),this.on.TimeUpdate&&"function"==typeof this.on.TimeUpdate&&this.on.TimeUpdate({current:this.GetTime(),max:this.GetTimeMax(),down:this.GetTimeDown(),ratio:this.GetTimeRatio(),par:this.GetTimePar()})):(this.$.uiDisplayTime&&r(this.$.uiDisplayTime,"00:00"),this.$.uiDisplayTimeNow&&r(this.$.uiDisplayTimeNow,"00:00"),this.$.uiDisplayTimeTotal&&r(this.$.uiDisplayTimeTotal,"00:00"),this.$.uiDisplayTimeDown&&r(this.$.uiDisplayTimeDown,"00:00"),this.$.uiBtnChangeDisplayTime&&r(this.$.uiBtnChangeDisplayTime,"00:00"),this.$.uiBtnChangeDisplayTimeDown&&r(this.$.uiBtnChangeDisplayTimeDown,"00:00"),this.$.uiDisplayTimePar&&r(this.$.uiDisplayTimePar,"0%"),this.$.uiSeekbarTimeCover&&(this.$.uiSeekbarTimeCover[0].style.width="0%")))}},{key:"Play",value:function(e){(this.$.uiBtnPlay||this.$.uiBtnDataId)&&(this.Player.paused()?(!this.on.PlayPrep&&e&&(this.on.PlayPrep=e),this.on.PlayPrep&&"function"==typeof this.on.PlayPrep&&this.on.PlayPrep(this,this.Player),this.Player.play(),this.ClassOn(),!this.on.Play&&e&&(this.on.Play=e),this.on.Play&&"function"==typeof this.on.Play&&this.on.Play(this,this.Player)):(this.Pause(),this.ClassOff()))}},{key:"Stop",value:function(e){this.Player.pause(),this.Player.currentTime(0),this.ClassOff(),!this.on.Stop&&e&&(this.on.Stop=e),this.on.Stop&&"function"==typeof this.on.Stop&&this.on.Stop(this,this.Player)}},{key:"Pause",value:function(e){this.Player.pause(),this.ClassOff(),!this.on.Pause&&e&&(this.on.Pause=e),this.on.Pause&&"function"==typeof this.on.Pause&&this.on.Pause(this,this.Player)}},{key:"Mute",value:function(){this.Player.muted()?(this.CONFIG.muted=!1,this.Player.muted(!1),this.SetVolume(this.CONFIG.volume),s(this.$.uiBtnMute,this.CONFIG.classname_active)):(this.CONFIG.muted=!0,this.Player.muted(!0),this.Player.volume(0),o(this.$.uiBtnMute,this.CONFIG.classname_active))}},{key:"Change",value:function(e,t){var i=this;if(""!=e&&null!=e&&null!=e)if(this.CONFIG.videoid!==e){this.PlayerChangeLoadFlg=!1,this.CONFIG.videoid=e;var n=window.navigator.userAgent.toLowerCase();-1==n.indexOf("msie")&&-1==n.indexOf("trident")&&-1==n.indexOf("edge")&&this.Player.currentTime(0),this.Player.play(),this.Player.catalog.getVideo(e,(function(e,n){i.Player.catalog.load(n),i.PlayerMediaInfo=i.Player.mediainfo,i.SetInfo(),i.SetPoster(),setTimeout((function(){i.Player.play(),i.ClassOff(),i.ClassOn()}),100),setTimeout((function(){i.PlayerChangeLoadFlg=!0,!i.on.Change&&t&&(i.on.Change=t),i.on.Change&&"function"==typeof i.on.Change&&i.on.Change(i,i.Player)}),300)})),this.Player.on("loadeddata",(function(){i.PlayerChangeLoadFlg=!0,i.Player.off("loadeddata")}))}else this.Play(),!this.on.Change&&t&&(this.on.Change=t),this.on.Change&&"function"==typeof this.on.Change&&this.on.Change(this,this.Player)}},{key:"PauseAll",value:function(e){window.PLAYER_MODULE_ALL_PLATLIST.map((function(e){e.instance.Pause()})),!this.on.PauseAll&&e&&(this.on.PauseAll=e),this.on.PauseAll&&"function"==typeof this.on.PauseAll&&this.on.PauseAll(this,this.Player)}},{key:"StopAll",value:function(e){window.PLAYER_MODULE_ALL_PLATLIST.map((function(e){e.instance.Stop()})),!this.on.StopAll&&e&&(this.on.StopAll=e),this.on.StopAll&&"function"==typeof this.on.StopAll&&this.on.StopAll(this,this.Player)}},{key:"SeekTo",value:function(e){return!!e&&"object"!=m(e)&&"function"!=typeof e&&("string"==typeof e&&(e=Number(e)),!!e&&void this.Player.currentTime(e))}},{key:"GetTime",value:function(){var t=e.parseNumber(Math.floor(this.Player.currentTime()/60)),i=e.parseNumber(Math.floor(this.Player.currentTime()%60));return isFinite(i)&&isFinite(t)?t+":"+i:"00:00"}},{key:"GetTimeDown",value:function(){var t=this.Player.duration()-this.Player.currentTime(),i=e.parseNumber(Math.floor(t/60)),n=e.parseNumber(Math.floor(t%60));return isFinite(n)&&isFinite(i)?i+":"+n:"00:00"}},{key:"GetTimeMax",value:function(){return e.parseNumber(Math.floor(this.Player.duration()/60))+":"+e.parseNumber(Math.floor(this.Player.duration()%60))}},{key:"GetTimeRatio",value:function(){return Math.floor(this.Player.currentTime()/this.Player.duration()*1e3)/1e3}},{key:"GetTimePar",value:function(){var e=Math.floor(this.Player.currentTime()/this.Player.duration()*1e3)/10;return isFinite(e)?e+"%":"0%"}},{key:"GetPoster",value:function(){return this.Player.poster()}},{key:"GetMediaInfo",value:function(){return this.Player.mediainfo}},{key:"SetPoster",value:function(e){e?this.Player.poster(e):(0!=this.CONFIG.poster&&(this.CONFIG.poster=this.Player.poster()),this.$.uiDisplayPoster&&("audio"==this.CONFIG.mode?r(this.$.uiDisplayPoster,""):r(this.$.uiDisplayPoster,'<img src="'.concat(this.CONFIG.poster,'" alt="">'))),this.$.uiDisplayPosterBg&&"audio"!=this.CONFIG.mode&&u(this.$.uiDisplayPosterBg,{backgroundImage:"url(".concat(this.CONFIG.poster,")")}))}},{key:"SetVolume",value:function(e){this.CONFIG.volume=e||this.CONFIG.volume,this.Player.volume(this.CONFIG.volume)}},{key:"SetInfo",value:function(){this.$.uiDisplayName&&r(this.$.uiDisplayName,this.PlayerMediaInfo.name)}},{key:"Destroy",value:function(){this.Player.reset()}}])&&v(t.prototype,i),n&&v(t,n),e}()}])}));