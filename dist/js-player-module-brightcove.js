/*! @yama-dev/js-player-module-brightcove version:6.3.1 repository:https://github.com/yama-dev/js-player-module-brightcove copyright:yama-dev licensed:MIT */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.PLAYER_MODULE_BRIGHTCOVE=t():e.PLAYER_MODULE_BRIGHTCOVE=t()}(self,(function(){return e={357:function(e){window,e.exports=function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";function n(e){try{return e instanceof HTMLElement}catch(e){return!1}}function a(e){try{return"string"==typeof e}catch(e){return!1}}function o(e){if(!e)return!1;var t;if(!Array.isArray(e)&&!e.length||a(e))t=n(e)?Array(e):Array.prototype.slice.call(document.querySelectorAll(e));else{if(!n(e[0]))return!1;t=Array.prototype.slice.call(e)}return 0===t.length&&(t=null),t}function r(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}i.r(t),i.d(t,"default",(function(){return s}));var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,s;return t=e,s=[{key:"isDom",value:function(e){return n(e)}},{key:"isStr",value:function(e){return a(e)}},{key:"selectDom",value:function(e){return o(e)}}],(i=[{key:"selectDom",value:function(e){return o(e)}},{key:"hasClass",value:function(e,t){return function(e,t){return n(e)?e.classList.contains(t):document.querySelector(e).classList.contains(t)}(e,t)}},{key:"addClass",value:function(e,t){return function(e,t){var i=o(e);if(!i)return!1;i.map((function(e){e.classList.add(t)}))}(e,t)}},{key:"removeClass",value:function(e,t){return function(e,t){var i=o(e);if(!i)return!1;i.map((function(e){e.classList.remove(t)}))}(e,t)}},{key:"toggleClass",value:function(e,t){return function(e,t){var i=o(e);if(!i)return!1;i.map((function(e){e.classList.toggle(t)}))}(e,t)}},{key:"addEvent",value:function(e,t,i){return function(e,t,i){if(e===window)window.addEventListener(t,i,{passive:!1});else{var n=o(e);if(!n)return!1;n.map((function(e){e.addEventListener(t,i,{passive:!1})}))}}(e,t,i)}},{key:"removeEvent",value:function(e,t,i){return function(e,t,i){if(e===window)window.removeEventListener(t,i);else{var n=o(e);if(!n)return!1;n.map((function(e){e.removeEventListener(t,i)}))}}(e,t,i)}},{key:"setHtml",value:function(e,t){return function(e,t){var i=o(e);if(!i)return!1;i.map((function(e){e.innerHTML=t}))}(e,t)}},{key:"appendHtml",value:function(e,t){return function(e,t){var i=o(e);if(!i)return!1;i.map((function(e){e.innerHTML+=t}))}(e,t)}},{key:"setStyle",value:function(e,t){return function(e,t){var i=o(e);if(!i)return!1;i.map((function(e){var i="";Object.keys(t).forEach((function(e){null!==t[e]&&(i+=e.replace(/([A-Z])/g,"-$1").toLowerCase()+": "+t[e]+";")})),e.setAttribute("style",i)}))}(e,t)}},{key:"setAttribute",value:function(e,t){return function(e,t){var i=o(e);if(!i)return!1;i.map((function(e){var i="";Object.keys(t).forEach((function(n){i=n.replace(/([A-Z])/g,"-$1").toLowerCase(),e.setAttribute(i,t[n])}))}))}(e,t)}}])&&r(t.prototype,i),s&&r(t,s),e}()}]).default},464:function(e){window,e.exports=function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_blank";return!!e&&e.replace(/((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:\/~?%&;=+#',()*!]+))/g,(function(e,i,n,a){return'<a href="'.concat(n+a,'" target="').concat(t,'">').concat(i,"</a>")}))}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_blank";return!!e&&e.replace(/\#(\S*)\s?/g,'<a href="https://twitter.com/search?q=%23$1" target="'+t+'">#$1</a>')}function o(e,t){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!e)return!1;for(var n in t){new RegExp("({{.?"+n+".?}})","g");var a=new RegExp("{{.?("+n+").?}}","g");e.match(a);var o=RegExp.$1;e=e.replace(a,t[o])}return i&&(e=e.replace(/({{.*}})/g,"")),e}function r(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0";return!!e&&("number"==typeof e&&(e=String(e)),t||(t=e.length),String.prototype.padStart||(String.prototype.padStart=function(e,t){return e>>=0,t=String(void 0!==t?t:" "),this.length>=e?String(this):((e-=this.length)>t.length&&(t+=t.repeat(e/t.length)),t.slice(0,e)+String(this))}),e.padStart(t,i))}function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}i.r(t),i.d(t,"PARSE_MODULE",(function(){return l}));var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,i,l;return t=e,l=[{key:"Str2AddLink",value:function(e){return n(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_blank")}},{key:"Str2AddLinkHashtag",value:function(e){return a(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_blank")}},{key:"Str2DateFormat",value:function(e){return function(e){if(!e)return!1;var t=e.split(/\D/);if(t.length>=4){var i=[];t.map((function(e){if(""==e)return!1;i.push(e)})),t=i}return(t=t.map((function(e){var t=e;return Number(e)<=9&&(t="0"+Number(e)),t}))).join("-")}(e)}},{key:"Str2Mustache",value:function(e,t){return o(e,t,!(arguments.length>2&&void 0!==arguments[2])||arguments[2])}},{key:"Str2zeroPadding",value:function(e,t){return r(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0")}}],(i=null)&&s(t.prototype,i),l&&s(t,l),e}()}])},200:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.viewPlayerScriptcode=void 0,t.viewPlayerScriptcode="//players.brightcove.net/{{ account }}/{{ player }}_default/index.min.js"},45:function(e,t,i){"use strict";var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,i=1,n=arguments.length;i<n;i++)for(var a in t=arguments[i])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.PLAYER_MODULE_BRIGHTCOVE=void 0;var a=new(i(357)),o=i(464).PARSE_MODULE.Str2Mustache,r=i(200),s=i(882),l=i(91),u=i(959),c=function(){function e(e){var t=this;this.VERSION="6.3.1",this.PlayerChangeLoadFlg=!0,this.CONFIG={mode:"movie",id:"pmb",player_id:"pmb_player",player_id_wrap:"pmb_player_wrap",player_ui_id:"pmb_ui",player_style_id:"pmb_style",videoid:"",account:"",width:"",height:"",player:"default",volume:1,playsinline:"webkit-playsinline playsinline",loop:"",muted:"",ui_controls:"",ui_autoplay:"",ui_default:!1,ui_default_css:!0,stop_outfocus:!1,poster:"",add_style:"",classname_active_wrap:"is-pmb-wrap",classname_active:"active"},this.on={PlayerInit:null,PlayerEnded:null,PlayerPlay:null,PlayerPause:null,TimeUpdate:null,VolumeChange:null,PlayPrep:null,Play:null,Pause:null,Stop:null,PauseAll:null,StopAll:null,Change:null},this.PlayerMediaInfo={},this.Player=null,this.$={playerElem:[],playerElemMainWrap:[],uiBtnPlay:[],uiBtnStop:[],uiBtnPause:[],uiBtnMute:[],uiBtnVolon:[],uiBtnVoloff:[],uiDisplayTime:[],uiDisplayTimeNow:[],uiDisplayTimeTotal:[],uiDisplayTimeDown:[],uiDisplayTimePar:[],uiDisplayPoster:[],uiDisplayPosterBg:[],uiDisplayName:[],uiSeekbarVol:[],uiSeekbarVolBg:[],uiSeekbarVolCover:[],uiSeekbarTime:[],uiSeekbarTimeBg:[],uiSeekbarTimeCover:[],uiBtnChange:[],uiBtnDataId:[]},this.playerHtml="",this.playerUiHtml="",this.playerCss="",this.playerCssOption="",this.playerScriptCode="",this.PlayerJson={},this.PlayerChangeSeekingFlg=!1,this.state={poster:""},e.id&&e.videoid||console.log("Inadequate parameters (id, videoid)"),this.CONFIG={mode:e.mode||"movie",id:e.id||"pmb",player_id:"".concat(e.id,"_player")||0,player_id_wrap:"".concat(e.id,"_player_wrap")||0,player_ui_id:"".concat(e.id,"_ui")||0,player_style_id:"".concat(e.id,"_style")||0,videoid:e.videoid||"",account:e.account||"",width:e.width||"",height:e.height||"",player:e.player||"default",volume:e.volume||1,playsinline:!1!==e.playsinline?"webkit-playsinline playsinline":"",loop:!0===e.loop?"loop":"",muted:!0===e.muted?"muted":"",ui_controls:!0===e.ui_controls?"controls":"",ui_autoplay:!0===e.ui_autoplay?"autoplay":"",ui_default:!1!==e.ui_default,ui_default_css:!1!==e.ui_default_css,stop_outfocus:!0===e.stop_outfocus,poster:e.poster||"",add_style:e.add_style||"",classname_active_wrap:e.classname_active_wrap||"is-pmb-wrap",classname_active:e.classname_active||"active"},e.on&&(this.on=n(n({},this.on),e.on)),this.$.playerElem=a.selectDom("#".concat(this.CONFIG.id)),"audio"==this.CONFIG.mode&&(this.CONFIG.width="1",this.CONFIG.height="1");var i=n(n({},this.CONFIG),{poster:this.CONFIG.poster?'poster="'.concat(this.CONFIG.poster,'"'):""});this.playerHtml=o(l.viewPlayerMain,i),this.playerUiHtml=o(l.viewPlayerUi,i),this.playerCss=o(u.viewPlayerStyle,i),this.playerScriptCode=o(r.viewPlayerScriptcode,i),"audio"==this.CONFIG.mode&&(this.playerCssOption+="#".concat(this.CONFIG.player_id," { opacity: 0.001; }")),this.CONFIG.add_style&&(this.playerCssOption+=this.CONFIG.add_style),"complete"==document.readyState||"interactive"==document.readyState?this.BuildPlayer():document.addEventListener("DOMContentLoaded",(function(){t.BuildPlayer()}))}return e.prototype.BuildPlayer=function(){var e=this,t=document.createElement("div");t.innerHTML=this.playerUiHtml,this.CONFIG.ui_default&&this.$.playerElem[0].insertBefore(t,this.$.playerElem[0].firstElementChild);var i=document.createElement("div");i.id=this.CONFIG.player_id_wrap,i.innerHTML=this.playerHtml,this.$.playerElem[0].insertBefore(i,this.$.playerElem[0].firstElementChild);var n=document.createElement("style");n.innerHTML=this.playerCss,n.id=this.CONFIG.id+"_scripttag",this.CONFIG.ui_default_css?(n.innerHTML=this.playerCss,n.innerHTML+=this.playerCssOption,a.selectDom("#".concat(this.CONFIG.id," #").concat(this.CONFIG.player_style_id))||this.$.playerElem[0].appendChild(n)):(n.innerHTML=this.playerCssOption,a.selectDom("#".concat(this.CONFIG.id," #").concat(this.CONFIG.player_style_id))||this.$.playerElem[0].appendChild(n)),this.CacheElement();var o=document.createElement("script");o.id="".concat(this.CONFIG.id,"_scripttag"),o.onload=function(){e.PlayerInstance()},o.onerror=function(){console.log("ERROR: not script loaded.")},o.src="".concat(this.playerScriptCode,"?").concat(Date.now()),document.body.appendChild(o)},e.prototype.PlayerInstance=function(){var t=this,i=this;this.Player=videojs(this.CONFIG.player_id),this.PlayerJson=this.Player.toJSON(),this.EventPlay(),this.EventPause(),this.EventStop(),this.EventMute(),this.EventVolon(),this.EventVoloff(),this.EventSeekbarVol(),this.EventSeekbarTime(),this.EventChangeVideo(),this.AddGlobalObject();var n=!1;this.Player.on("loadedmetadata",(function(){if(n)return!1;n=!0,t.SetVolume(t.CONFIG.volume),t._setInfo(),t.SetPoster(),t.Update(),t.on.PlayerInit&&"function"==typeof t.on.PlayerInit&&t.on.PlayerInit(i,i.Player)})),this.Player.on("loadeddata",(function(){if(n)return!1;n=!0,t.SetVolume(t.CONFIG.volume),t._setInfo(),t.SetPoster(),t.Update(),t.on.PlayerInit&&"function"==typeof t.on.PlayerInit&&t.on.PlayerInit(i,i.Player)})),this.Player.on("timeupdate",(function(){t.Update()})),this.Player.on("volumechange",(function(){var i=t.Player.volume();a.setStyle(t.$.uiSeekbarVolCover,{width:100*i+"%"}),t.on.VolumeChange&&"function"==typeof t.on.VolumeChange&&t.on.VolumeChange({volume:e.toFixedNumber(i,3),par:e.toFixedNumber(100*i,1)})})),this.Player.on("ended",(function(){t.Stop(),t.on.PlayerEnded&&"function"==typeof t.on.PlayerEnded&&t.on.PlayerEnded(i,i.Player)})),this.Player.on("play",(function(){t.ClassOn(),t.on.PlayerPlay&&"function"==typeof t.on.PlayerPlay&&t.on.PlayerPlay(i,i.Player)})),this.Player.on("pause",(function(){t.ClassOff(),t.on.PlayerPause&&"function"==typeof t.on.PlayerPause&&t.on.PlayerPause(i,i.Player)})),this.Player.on("error",(function(e){console.log(e)}))},e.prototype.AddGlobalObject=function(){void 0===window.PLAYER_MODULE_ALL_PLATLIST?(window.PLAYER_MODULE_ALL_PLATLIST=[],window.PLAYER_MODULE_ALL_PLATLIST.push({instance:this,Player:this.Player,videoid:this.CONFIG.videoid,id:this.CONFIG.id,player_id:this.CONFIG.player_id})):window.PLAYER_MODULE_ALL_PLATLIST.push({instance:this,Player:this.Player,videoid:this.CONFIG.videoid,id:this.CONFIG.id,player_id:this.CONFIG.player_id})},e.prototype.CacheElement=function(){this.$.playerElem=a.selectDom("#".concat(this.CONFIG.id)),this.$.playerElemMainWrap=a.selectDom("#".concat(this.CONFIG.id," #").concat(this.CONFIG.player_id_wrap)),this.$.uiBtnPlay=a.selectDom("#"+this.CONFIG.id+" .ui-btn-play"),this.$.uiBtnStop=a.selectDom("#"+this.CONFIG.id+" .ui-btn-stop"),this.$.uiBtnPause=a.selectDom("#"+this.CONFIG.id+" .ui-btn-pause"),this.$.uiBtnMute=a.selectDom("#"+this.CONFIG.id+" .ui-btn-mute"),this.$.uiBtnVolon=a.selectDom("#"+this.CONFIG.id+" .ui-btn-volon"),this.$.uiBtnVoloff=a.selectDom("#"+this.CONFIG.id+" .ui-btn-voloff"),this.$.uiDisplayTime=a.selectDom("#"+this.CONFIG.id+" .ui-time"),this.$.uiDisplayTimeNow=a.selectDom("#"+this.CONFIG.id+" .ui-time-now"),this.$.uiDisplayTimeTotal=a.selectDom("#"+this.CONFIG.id+" .ui-time-total"),this.$.uiDisplayTimeDown=a.selectDom("#"+this.CONFIG.id+" .ui-time-down"),this.$.uiDisplayTimePar=a.selectDom("#"+this.CONFIG.id+" .ui-time-par"),this.$.uiDisplayPoster=a.selectDom("#"+this.CONFIG.id+" .ui-poster"),this.$.uiDisplayPosterBg=a.selectDom("#"+this.CONFIG.id+" .ui-poster-background"),this.$.uiDisplayName=a.selectDom("#"+this.CONFIG.id+" .ui-name"),this.$.uiSeekbarVol=a.selectDom("#"+this.CONFIG.id+" .ui-seekbar-vol"),this.$.uiSeekbarVolBg=a.selectDom("#"+this.CONFIG.id+" .ui-seekbar-vol .ui-seekbar-vol-bg"),this.$.uiSeekbarVolCover=a.selectDom("#"+this.CONFIG.id+" .ui-seekbar-vol span"),this.$.uiSeekbarTime=a.selectDom("#"+this.CONFIG.id+" .ui-seekbar-time"),this.$.uiSeekbarTimeBg=a.selectDom("#"+this.CONFIG.id+" .ui-seekbar-time .ui-seekbar-time-bg"),this.$.uiSeekbarTimeCover=a.selectDom("#"+this.CONFIG.id+" .ui-seekbar-time span"),this.$.uiBtnChange=a.selectDom("#"+this.CONFIG.id+" .ui-btn-change"),this.$.uiBtnDataId=a.selectDom("[data-PMB-id]")},e.prototype.EventPlay=function(){var e=this;this.$.uiBtnPlay&&a.addEvent(this.$.uiBtnPlay,"click",(function(){e.Player.paused()?e.Play():e.Pause()}))},e.prototype.EventPause=function(){var e=this;this.$.uiBtnPause&&a.addEvent(this.$.uiBtnPause,"click",(function(){e.Pause()}))},e.prototype.EventStop=function(){var e=this;this.$.uiBtnStop&&a.addEvent(this.$.uiBtnStop,"click",(function(){e.Stop()})),a.addEvent(window,"blur",(function(){e.CONFIG.stop_outfocus&&e.Stop()}))},e.prototype.EventMute=function(){var e=this;this.$.uiBtnMute&&a.addEvent(this.$.uiBtnMute,"click",(function(){e.Mute()}))},e.prototype.EventVolon=function(){var e=this;this.$.uiBtnVolon&&a.addEvent(this.$.uiBtnVolon,"click",(function(){e.SetVolume(e.CONFIG.volume),a.removeClass(e.$.uiBtnVolon,e.CONFIG.classname_active)}))},e.prototype.EventVoloff=function(){var e=this;this.$.uiBtnVoloff&&a.addEvent(this.$.uiBtnVoloff,"click",(function(){e.SetVolume("off"),a.addClass(e.$.uiBtnVoloff,e.CONFIG.classname_active)}))},e.prototype.EventSeekbarVol=function(){var e=this;if(this.$.uiSeekbarVol){var t=!1,i=0;a.setStyle(this.$.uiSeekbarVolCover,{width:"100%"}),a.addEvent(this.$.uiSeekbarVol,"mousedown",(function(n){t=!0;var a=n.currentTarget,o=a.clientWidth,r=a.getBoundingClientRect().left;i=(n.pageX-r)/o,e.SetVolume(i)})),a.addEvent(this.$.uiSeekbarVol,"mouseleave",(function(){t=!1})),a.addEvent(this.$.uiSeekbarVol,"mouseup",(function(){t=!1})),a.addEvent(this.$.uiSeekbarVol,"mousemove",(function(n){if(!0===t){var a=n.currentTarget,o=a.clientWidth,r=a.getBoundingClientRect().left;i=(n.pageX-r)/o,e.Player.muted()&&e.Player.muted(!1),e.SetVolume(i)}}))}},e.prototype.EventSeekbarTime=function(){var e=this;if(this.$.uiSeekbarTime){var t=0;(0,s.isTouchDevice)()?(a.addEvent(this.$.uiSeekbarTime,"touchstart",(function(i){e.PlayerChangeSeekingFlg=!0;var n=i.touches[0].target,o=n.clientWidth,r=n.getBoundingClientRect().left,s=(i.touches[0].pageX-r)/o;t=e.Player.duration()*s,a.setStyle(e.$.uiSeekbarTimeCover,{width:100*s+"%"}),e.Player.currentTime(t)})),a.addEvent(this.$.uiSeekbarTime,"touchcancel",(function(){e.PlayerChangeSeekingFlg&&(e.Play(),setTimeout((function(){e.Play(),e.PlayerChangeSeekingFlg=!1}),100))})),a.addEvent(this.$.uiSeekbarTime,"touchend",(function(){e.PlayerChangeSeekingFlg&&(e.Play(),setTimeout((function(){e.Play(),e.PlayerChangeSeekingFlg=!1}),100))})),a.addEvent(this.$.uiSeekbarTime,"touchmove",(function(i){if(e.PlayerChangeSeekingFlg){var n=i.touches[0].target,o=n.clientWidth,r=n.getBoundingClientRect().left,s=(i.touches[0].pageX-r)/o;t=e.Player.duration()*s,s>=1&&(s=1),s<=0&&(s=0),a.setStyle(e.$.uiSeekbarTimeCover,{width:100*s+"%"}),e.Player.currentTime(t)}}))):(a.addEvent(this.$.uiSeekbarTime,"mousedown",(function(i){e.PlayerChangeSeekingFlg=!0;var n=i.currentTarget,o=n.clientWidth,r=n.getBoundingClientRect().left,s=(i.pageX-r)/o;t=e.Player.duration()*s,a.setStyle(e.$.uiSeekbarTimeCover,{width:100*s+"%"}),e.Player.currentTime(t)})),a.addEvent(this.$.uiSeekbarTime,"mouseleave",(function(){e.PlayerChangeSeekingFlg&&(e.Play(),setTimeout((function(){e.Play(),e.PlayerChangeSeekingFlg=!1}),100))})),a.addEvent(this.$.uiSeekbarTime,"mouseup",(function(){e.PlayerChangeSeekingFlg&&(e.Play(),setTimeout((function(){e.Play(),e.PlayerChangeSeekingFlg=!1}),100))})),a.addEvent(this.$.uiSeekbarTime,"mousemove",(function(i){if(e.PlayerChangeSeekingFlg){var n=i.currentTarget,o=n.clientWidth,r=n.getBoundingClientRect().left,s=(i.pageX-r)/o;t=e.Player.duration()*s,s>=1&&(s=1),s<=0&&(s=0),a.setStyle(e.$.uiSeekbarTimeCover,{width:100*s+"%"}),e.Player.currentTime(t)}})))}},e.prototype.EventChangeVideo=function(){var e=this;this.$.uiBtnChange&&a.addEvent(this.$.uiBtnChange,"click",(function(t){var i=t.currentTarget.dataset.pmbId;e.Change(i)}))},e.prototype.ClassOn=function(){var e=this;this.$.playerElem&&a.addClass(this.$.playerElem,this.CONFIG.classname_active_wrap),this.$.uiBtnPlay&&a.addClass(this.$.uiBtnPlay,this.CONFIG.classname_active),this.$.uiBtnPause&&a.addClass(this.$.uiBtnPause,this.CONFIG.classname_active),this.$.uiBtnDataId&&this.$.uiBtnDataId.map((function(t){e.CONFIG.videoid==t.getAttribute("data-PMB-id")&&a.addClass(t,e.CONFIG.classname_active)}))},e.prototype.ClassOff=function(){this.$.playerElem&&a.removeClass(this.$.playerElem,this.CONFIG.classname_active_wrap),this.$.uiBtnPlay&&a.removeClass(this.$.uiBtnPlay,this.CONFIG.classname_active),this.$.uiBtnPause&&a.removeClass(this.$.uiBtnPause,this.CONFIG.classname_active),this.$.uiBtnDataId&&a.removeClass(this.$.uiBtnDataId,this.CONFIG.classname_active)},e.prototype.Update=function(){this.PlayerChangeSeekingFlg||(this.PlayerChangeLoadFlg?(this.$.uiDisplayTime&&a.setHtml(this.$.uiDisplayTime,this.GetTime()+"/"+this.GetTimeMax()),this.$.uiDisplayTimeNow&&a.setHtml(this.$.uiDisplayTimeNow,this.GetTime()),this.$.uiDisplayTimeDown&&a.setHtml(this.$.uiDisplayTimeDown,this.GetTimeDown()),this.$.uiDisplayTimeTotal&&a.setHtml(this.$.uiDisplayTimeTotal,this.GetTimeMax()),this.$.uiDisplayTimePar&&a.setHtml(this.$.uiDisplayTimePar,this.GetTimePar()),this.$.uiSeekbarTimeCover&&(this.$.uiSeekbarTimeCover[0].style.width=this.GetTimePar()),this.on.TimeUpdate&&"function"==typeof this.on.TimeUpdate&&this.on.TimeUpdate({current:this.GetTime(),max:this.GetTimeMax(),down:this.GetTimeDown(),ratio:this.GetTimeRatio(),par:this.GetTimePar()})):(this.$.uiDisplayTime&&a.setHtml(this.$.uiDisplayTime,"00:00/00:00"),this.$.uiDisplayTimeNow&&a.setHtml(this.$.uiDisplayTimeNow,"00:00"),this.$.uiDisplayTimeDown&&a.setHtml(this.$.uiDisplayTimeDown,"00:00"),this.$.uiDisplayTimeTotal&&a.setHtml(this.$.uiDisplayTimeTotal,"00:00"),this.$.uiDisplayTimePar&&a.setHtml(this.$.uiDisplayTimePar,"0%"),this.$.uiSeekbarTimeCover&&(this.$.uiSeekbarTimeCover[0].style.width="0%")))},e.prototype.Play=function(e){this.Player.paused()?(!this.on.PlayPrep&&e&&(this.on.PlayPrep=e),this.on.PlayPrep&&"function"==typeof this.on.PlayPrep&&this.on.PlayPrep(this,this.Player),this.Player.play(),this.ClassOn(),!this.on.Play&&e&&(this.on.Play=e),this.on.Play&&"function"==typeof this.on.Play&&this.on.Play(this,this.Player)):(this.Pause(),this.ClassOff())},e.prototype.Stop=function(e){this.Player.pause(),this.Player.currentTime(0),this.ClassOff(),!this.on.Stop&&e&&(this.on.Stop=e),this.on.Stop&&"function"==typeof this.on.Stop&&this.on.Stop(this,this.Player)},e.prototype.Pause=function(e){this.Player.pause(),this.ClassOff(),!this.on.Pause&&e&&(this.on.Pause=e),this.on.Pause&&"function"==typeof this.on.Pause&&this.on.Pause(this,this.Player)},e.prototype.Mute=function(){this.Player.muted()?(this.Player.muted(!1),this.SetVolume(this.CONFIG.volume),a.removeClass(this.$.uiBtnMute,this.CONFIG.classname_active)):(this.Player.muted(!0),this.Player.volume(0),a.addClass(this.$.uiBtnMute,this.CONFIG.classname_active))},e.prototype.Change=function(e,t,i){var n=this;if(void 0===t&&(t=null),""!=e&&null!=e&&null!=e){var a=this.Player.paused(),o=this.Player.muted();if(this.CONFIG.videoid!==e){this.PlayerChangeLoadFlg=!1,this.CONFIG.videoid=e;var r=window.navigator.userAgent.toLowerCase();-1==r.indexOf("msie")&&-1==r.indexOf("trident")&&r.indexOf("edge"),this.Player.catalog.getVideo(e,(function(e,r){n.Player.catalog.load(r),n._setInfo(),n.SetPoster(),setTimeout((function(){(!1===a||!0===t)&&n.Player.play(),!1===o&&n.Player.muted(!1),n.ClassOff(),n.ClassOn()}),1),setTimeout((function(){n.PlayerChangeLoadFlg=!0,!n.on.Change&&i&&(n.on.Change=i),n.on.Change&&"function"==typeof n.on.Change&&n.on.Change(n,n.Player)}),300)})),this.Player.on("loadeddata",(function(){n.PlayerChangeLoadFlg=!0,n.Player.off("loadeddata")}))}else t&&this.Play(),!this.on.Change&&i&&(this.on.Change=i),this.on.Change&&"function"==typeof this.on.Change&&this.on.Change(this,this.Player)}},e.prototype.PauseAll=function(e){window.PLAYER_MODULE_ALL_PLATLIST.map((function(e){e.instance.Pause()})),!this.on.PauseAll&&e&&(this.on.PauseAll=e),this.on.PauseAll&&"function"==typeof this.on.PauseAll&&this.on.PauseAll(this,this.Player)},e.prototype.StopAll=function(e){window.PLAYER_MODULE_ALL_PLATLIST.map((function(e){e.instance.Stop()})),!this.on.StopAll&&e&&(this.on.StopAll=e),this.on.StopAll&&"function"==typeof this.on.StopAll&&this.on.StopAll(this,this.Player)},e.prototype.SeekTo=function(e){return!!e&&"object"!=typeof e&&"function"!=typeof e&&("string"==typeof e&&(e=Number(e)),!!e&&void this.Player.currentTime(e))},e.prototype.GetTime=function(){var t=e.parseNumber(Math.floor(this.Player.currentTime()/60)),i=e.parseNumber(Math.floor(this.Player.currentTime()%60));return isFinite(i)&&isFinite(t)?t+":"+i:"00:00"},e.prototype.GetTimeDown=function(){var t=this.Player.duration()-Math.floor(this.Player.currentTime()),i=e.parseNumber(Math.floor(t/60)),n=e.parseNumber(Math.floor(t%60));return isFinite(n)&&isFinite(i)?i+":"+n:"00:00"},e.prototype.GetTimeMax=function(){return e.parseNumber(Math.floor(this.Player.duration()/60))+":"+e.parseNumber(Math.floor(this.Player.duration()%60))},e.prototype.GetTimeRatio=function(){return Math.floor(this.Player.currentTime()/this.Player.duration()*1e3)/1e3},e.prototype.GetTimePar=function(){var e=Math.floor(this.Player.currentTime()/this.Player.duration()*1e3)/10;return isFinite(e)?e+"%":"0%"},e.prototype.GetPoster=function(){return this.Player.poster()},e.prototype.GetMediaInfo=function(){return this.Player.mediainfo},e.prototype.SetVolume=function(e){if("off"===e&&this.Player.volume(0),"number"==typeof e){if(Number(e)<0&&1<Number(e))return!1;this.CONFIG.volume=Number(e),this.Player.volume(this.CONFIG.volume)}},e.prototype.Destroy=function(){this.Player.reset()},e.prototype.SetPoster=function(e){null!=e&&this.Player.poster(e),this.state.poster=this.GetPoster(),this.state.poster&&(this.$.uiDisplayPoster&&("audio"==this.CONFIG.mode?a.setHtml(this.$.uiDisplayPoster,""):a.setHtml(this.$.uiDisplayPoster,'<img src="'.concat(this.state.poster,'" alt="">'))),this.$.uiDisplayPosterBg&&"audio"!=this.CONFIG.mode&&a.setStyle(this.$.uiDisplayPosterBg,{backgroundImage:"url(".concat(this.state.poster,")")}))},e.prototype._setInfo=function(){this.$.uiDisplayName&&a.setHtml(this.$.uiDisplayName,this.Player.mediainfo.name)},e.parseNumber=function(e){return"number"==typeof e&&(e=String(e)),Number(e)<10?"0"+e:Number(e)>=10?e:void 0},e.pad=function(e,t,i){return i=i||"0",(e+="").length>=t?e:new Array(t-e.length+1).join(i)+e},e.toFixedNumber=function(e,t,i){var n=Math.pow(i||10,t);return Math.round(Number(e)*n)/n},e}();t.PLAYER_MODULE_BRIGHTCOVE=c},882:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isTouchDevice=void 0,t.isTouchDevice=function(){return"ontouchstart"in window||navigator.maxTouchPoints>0}},91:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.viewPlayerUi=t.viewPlayerMain=void 0,t.viewPlayerMain='\n<video id="{{ player_id }}"\n  data-video-id="{{ videoid }}"\n  data-account="{{ account }}"\n  data-player="{{ player }}"\n  data-embed="default"\n  data-application-id\n  class="video-js"\n  width="{{ width }}"\n  height="{{ height }}"\n  {{ui_controls}}\n  {{ui_autoplay}}\n  {{playsinline}}\n  {{loop}}\n  {{muted}}\n  {{poster}}\n></video>\n',t.viewPlayerUi='\n  <div class="ui-time"></div>\n  <div class="ui-time-now"></div>\n  <div class="ui-time-down"></div>\n  <div class="ui-time-total"></div>\n  <div class="ui-time-par"></div>\n\n  <button class="ui-btn-play btn">play</button>\n  <button class="ui-btn-pause btn">pause</button>\n  <button class="ui-btn-stop btn">stop</button>\n  <button class="ui-btn-mute btn">mute</button>\n\n  <div class="ui-seekbar-time"><div class="ui-seekbar-time-bg"></div><span></span></div>\n  <div class="ui-seekbar-vol"><div class="ui-seekbar-vol-bg"></div><span></span></div>\n\n  <button class="ui-btn-volon btn">volume on</button>\n  <button class="ui-btn-voloff btn">volume off</button>\n\n  <div class="ui-poster"><img src="" alt=""></div>\n  <div class="ui-poster-background"></div>\n  <div class="ui-name"></div>\n'},959:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.viewPlayerStyle=void 0,t.viewPlayerStyle="\n#{{ id }} {\n  position: relative;\n}\n#{{ id }} .on {\n  display: none;\n}\n#{{ id }} .off {\n  display: block;\n}\n#{{ id }} .ui-btn-play {\n  width: 120px;\n  display: block;\n  cursor: pointer;\n}\n#{{ id }} .ui-btn-play.active {\n  display: none;\n}\n#{{ id }} .ui-btn-play:hover .on {\n  display: block;\n}\n#{{ id }} .ui-btn-play:hover .off {\n  display: none;\n}\n#{{ id }} .ui-btn-pause {\n  width: 120px;\n  display: none;\n  cursor: pointer;\n}\n#{{ id }} .ui-btn-pause.active {\n  display: block;\n}\n#{{ id }} .ui-btn-pause:hover .on {\n  display: block;\n}\n#{{ id }} .ui-btn-pause:hover .off {\n  display: none;\n}\n#{{ id }} .ui-btn-stop {\n  width: 120px;\n  cursor: pointer;\n}\n#{{ id }} .ui-btn-stop.active {\n  display: block;\n}\n#{{ id }} .ui-btn-stop:hover .on {\n  display: block;\n}\n#{{ id }} .ui-btn-stop:hover .off {\n  display: none;\n}\n#{{ id }} .ui-btn-mute {\n  width: 120px;\n  cursor: pointer;\n}\n#{{ id }} .ui-btn-mute.active .on {\n  display: block;\n}\n#{{ id }} .ui-btn-mute.active .off {\n  display: none;\n}\n#{{ id }} .ui-seekbar-vol {\n  width: 100%;\n  height: 13px;\n  padding: 4px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  touch-action: manipulation;\n}\n#{{ id }} .ui-seekbar-vol .ui-seekbar-vol_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 4px 0;\n}\n#{{ id }} .ui-seekbar-vol span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n#{{ id }} .ui-seekbar-time {\n  width: 100%;\n  height: 13px;\n  padding: 4px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  touch-action: manipulation;\n}\n#{{ id }} .ui-seekbar-time .ui-seekbar-time-bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 4px 0;\n}\n#{{ id }} .ui-seekbar-time span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n#{{ id }} .ui-display-poster img {\n  max-width: 100%;\n}\n"}},t={},i=function i(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,i),o.exports}(45),i=i.PLAYER_MODULE_BRIGHTCOVE;var e,t,i}));