"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();/*!
 * js-player-module-brightcove.js JavaScript Library v1.2.1
 * https://github.com/yama-dev/js-player-module-brightcove
 * Copyright yama-dev
 * Licensed under the MIT license.
 * Date: 2017-03-14
 */
!function(){var e=function(){function e(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,e),window.console||(window.console={log:function(e){}}),this.currentUrl=location.href,this.config={mode:i.mode||"movie",id:i.id||"pmb",player_id:i.id+"_player"||"pmb_player",videoid:i.videoid||"",account:i.account||"",width:i.width||"",height:i.height||"",player:i.player||"default",ui_controls:1==i.ui_controls?"controls":"",ui_autoplay:1==i.ui_autoplay?"autoplay":"",ui_default:0!=i.ui_default,ui_default_css:0!=i.ui_default_css,poster:i.poster||null,ui_round:i.ui_round||null,ui_round_num:i.ui_round_num||146,ui_round_color:i.ui_round_color||"#696969",style_text:i.style_text||""},this.playerVideo={id:"",name:"",description:"",duration:"",thumbnail:""},this.Player="",this.playerHtml='\n      <video id="'+this.config.player_id+'"\n        data-video-id="{{ videoid }}"\n        data-account="{{ account }}"\n        data-player="{{ player }}"\n        data-embed="default"\n        data-application-id\n        class="video-js"\n        width="{{ width }}"\n        height="{{ height }}"\n        {{ui_controls}}\n        {{ui_autoplay}}\n        ></video>\n    ',this.playerUiHtml='\n      <div class="display_time">00:00</div>\n      <div class="display_time_par">0%</div>\n      <button class="btn_play btn btn-default">play</button>\n      <button class="btn_pause btn btn-default">pause</button>\n      <button class="btn_stop btn btn-default">stop</button>\n      <button class="btn_mute btn btn-default">mute</button>\n      <div class="seekbar_time"><div class="seekbar_time_bg"></div><span></span></div>\n      <div class="seekbar_vol"><div class="seekbar_vol_bg"></div><span></span></div>\n      <button class="btn_full btn btn-default">full screen</button>\n      <div class="display_poster"><img src="" alt=""></div>\n      <div class="display_name"></div>\n    ',this.playerScriptCode="//players.brightcove.net/{{ account }}/{{ player }}_default/index.min.js",this.playerCss="\n#"+this.config.id+" {\n  position: relative;\n}\n#"+this.config.id+" .on {\n  display: none;\n}\n#"+this.config.id+" .off {\n  display: block;\n}\n#"+this.config.id+" .btn_play {\n  width: 120px;\n  height: 30px;\n  // position: absolute;\n  // top: 8px;\n  // left: 10px;\n  display: block;\n  cursor: pointer;\n}\n#"+this.config.id+" .btn_play.active {\n  display: none;\n}\n#"+this.config.id+" .btn_play:hover .on {\n  display: block;\n}\n#"+this.config.id+" .btn_play:hover .off {\n  display: none;\n}\n#"+this.config.id+" .btn_pause {\n  width: 120px;\n  height: 30px;\n  // position: absolute;\n  // top: 8px;\n  // left: 10px;\n  display: none;\n  cursor: pointer;\n}\n#"+this.config.id+" .btn_pause.active {\n  display: block;\n}\n#"+this.config.id+" .btn_pause:hover .on {\n  display: block;\n}\n#"+this.config.id+" .btn_pause:hover .off {\n  display: none;\n}\n#"+this.config.id+" .btn_stop {\n  width: 120px;\n  height: 30px;\n  // position: absolute;\n  // top: 8px;\n  // left: 10px;\n  cursor: pointer;\n}\n#"+this.config.id+" .btn_stop.active {\n  display: block;\n}\n#"+this.config.id+" .btn_stop:hover .on {\n  display: block;\n}\n#"+this.config.id+" .btn_stop:hover .off {\n  display: none;\n}\n#"+this.config.id+" .btn_mute {\n  width: 120px;\n  height: 30px;\n  // position: absolute;\n  // top: 6px;\n  // left: 110px;\n  cursor: pointer;\n}\n#"+this.config.id+" .btn_mute.active .on {\n  display: block;\n}\n#"+this.config.id+" .btn_mute.active .off {\n  display: none;\n}\n#"+this.config.id+" .seekbar_vol {\n  width: 100%;\n  height: 9px;\n  padding: 2px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#"+this.config.id+" .seekbar_vol .seekbar_vol_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 2px 0;\n}\n#"+this.config.id+" .seekbar_vol span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n#"+this.config.id+" .seekbar_time {\n  width: 100%;\n  height: 9px;\n  padding: 2px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#"+this.config.id+" .seekbar_time .seekbar_time_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 2px 0;\n}\n#"+this.config.id+" .seekbar_time span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n}\n    ","audio"==this.config.mode&&(this.config.width=1,this.config.height=1,this.playerCss+="#"+this.config.player_id+" { opacity: 0; }");for(var n in this.config){var o=(new RegExp("({{.?"+n+".?}})","g"),new RegExp("{{.?("+n+").?}}","g"));this.playerHtml.match(o);var a=RegExp.$1;this.playerHtml=this.playerHtml.replace(o,this.config[a])}for(var l in this.config){var r=(new RegExp("({{.?"+l+".?}})","g"),new RegExp("{{.?("+l+").?}}","g"));this.playerScriptCode.match(r);var s=RegExp.$1;this.playerScriptCode=this.playerScriptCode.replace(r,this.config[s])}for(var u in this.config){var d=(new RegExp("({{.?"+u+".?}})","g"),new RegExp("{{.?("+u+").?}}","g"));this.playerCss.match(d);var c=RegExp.$1;this.playerCss=this.playerCss.replace(d,this.config[c])}Element.prototype.hasClass=function(e){var t=this.className.split(" ");return t.indexOf(e)>=0},Element.prototype.addClass=function(e){if(!this.hasClass(e)){var t=this.className.split(" ");t.push(e),this.className=t.join(" ")}return this},Element.prototype.removeClass=function(e){var t=this.className.split(" "),i=t.indexOf(e);return i>=0&&(t.splice(i,1),this.className=t.join(" ")),this},Element.prototype.toggleClass=function(e){this.hasClass(e)?this.removeClass(e):this.addClass(e)},this.currentUrl.search(/localhost/)===-1&&this.currentUrl.search(/192.168/)===-1||this.DebugMode();var h=document.getElementById(this.config.id),y=document.createElement("div"),f=document.createElement("div"),v=document.createElement("style");y.innerHTML=this.playerHtml,f.innerHTML=this.playerUiHtml,v.innerHTML=this.playerCss,v.id=this.config.id+"_scripttag",h.appendChild(y),this.config.ui_default&&h.appendChild(f),this.config.ui_default_css&&h.appendChild(v),document.addEventListener("DOMContentLoaded",function(e){t.SetPlayer()})}return _createClass(e,[{key:"SetPlayer",value:function(){function e(){var e=window.navigator.userAgent.toLowerCase(),i=(window.navigator.appVersion.toLowerCase(),"0"),n="";e.indexOf("msie")!=-1||e.indexOf("trident")!=-1?(i="0",n="loadedmetadata"):e.indexOf("applewebkit")!=-1&&e.indexOf("edge")!=-1?(i="4",n="loadedmetadata"):e.indexOf("chrome")!=-1?(i="1",n="loadedmetadata",e.indexOf("iphone")>0||e.indexOf("ipad")>0?(i="4",n="loadedmetadata"):(e.indexOf("android")>0||e.indexOf("android")>0&&e.indexOf("mobile")>0)&&(/android/.test(e)&&/linux\; u\;/.test(e)&&!/chrome/.test(e)||/android/.test(e)&&/chrome/.test(e)&&/version/.test(e)||/android/.test(e)&&/chrome/.test(e)&&/samsungbrowser/.test(e)?(i="4",n="loadedmetadata",/so-04f/.test(e)&&(i="2",n="loadedmetadata")):(i="1",n="loadedmetadata"))):e.indexOf("safari")!=-1?(i="1",n="loadedmetadata",e.indexOf("iphone")>0||e.indexOf("ipad")>0?(i="1",n="loadedmetadata"):(e.indexOf("android")>0||e.indexOf("android")>0&&e.indexOf("mobile")>0)&&(/android/.test(e)&&/linux\; u\;/.test(e)&&!/chrome/.test(e)||/android/.test(e)&&/chrome/.test(e)&&/version/.test(e)||/android/.test(e)&&/chrome/.test(e)&&/samsungbrowser/.test(e)?(i="4",n="loadedmetadata",/so-04f/.test(e)&&(i="2",n="loadedmetadata")):(i="1",n="loadedmetadata"))):e.indexOf("opera")!=-1?(i="0",n="loadedmetadata"):e.indexOf("firefox")!=-1?(i="3",n="loadeddata"):(i="1",n="loadedmetadata"),t.PlayerLoadFlg=!1,videojs(t.config.player_id).on("error",function(e){console.log(this.error().code)}),videojs(t.config.player_id).on(n,function(){return t.Player=this,t.PlayerJson=t.Player.toJSON(),t.PlayerMediaInfo=t.Player.mediainfo,t.currentUrl.search(/localhost/)===-1&&t.currentUrl.search(/192.168/)===-1||t.DebugModePlayer(n,i),t.config.poster&&(t.Player.poster(t.config.poster),t.$uiDisplayPoster.innerHTML='<img src="'+t.config.poster+'" alt="">'),String(t.Player.readyState())===i&&t.PlayerLoadFlg!==!0&&(t.PlayerLoadFlg=!0,t.SetInfo(),t.EventPlay(),t.EventPause(),t.EventStop(),t.EventMute(),t.EventVolon(),t.EventVoloff(),t.EventBtnFull(),t.EventSeekbarVol(),t.EventSeekbarTime(),void t.EventChangeVideo())}),videojs(t.config.player_id).on("timeupdate",function(){t.$uiDisplayTime.innerHTML=t.GetTime()+"/"+t.GetTimeMax(),t.$uiDisplayTimePar.innerHTML=t.GetTimePar(),t.$uiSeekbarTimeCover.style.width=t.GetTimePar(),t.$uiBtnRoundSpan.style.webkitTransform="rotate("+360*t.GetTimeRatio()+"deg)";var e=3.14*t.$uiBtnRoundSvg.clientWidth!==0?3.14*t.$uiBtnRoundSvg.clientWidth:3.14*t.config.ui_round_num;t.$uiBtnRoundSvgPath.style.cssText="stroke-dashoffset: "+(e+10-360*t.GetTimeRatio()/365*e)+";"}),videojs(t.config.player_id).on("volumechange",function(){t.$uiSeekbarVolCover.style.width=100*t.Player.volume()+"%"}),videojs(t.config.player_id).on("ended",function(){t.Stop()})}var t=this;this.CacheElement();var i=document.createElement("script");i.id=t.config.id+"_scripttag",i.src=this.playerScriptCode,document.body.appendChild(i),i.onload=e,void 0===window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST?(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST=[],window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST.push(t.config.player_id)):window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST.push(t.config.player_id)}},{key:"DebugMode",value:function(){console.log(this)}},{key:"DebugModePlayer",value:function(e,t){console.log("player_id  -> "+this.config.player_id+"\nreadyState -> "+this.Player.readyState()+"\nloadNum    -> "+t+"\nloadEvent  -> "+e+"\n")}},{key:"CacheElement",value:function(){this.$uiBtnPlay=document.querySelectorAll("#"+this.config.id+" .btn_play")?document.querySelectorAll("#"+this.config.id+" .btn_play"):document.createElement("div"),this.$uiBtnStop=document.querySelector("#"+this.config.id+" .btn_stop")?document.querySelector("#"+this.config.id+" .btn_stop"):document.createElement("div"),this.$uiBtnPause=document.querySelector("#"+this.config.id+" .btn_pause")?document.querySelector("#"+this.config.id+" .btn_pause"):document.createElement("div"),this.$uiBtnMute=document.querySelector("#"+this.config.id+" .btn_mute")?document.querySelector("#"+this.config.id+" .btn_mute"):document.createElement("div"),this.$uiBtnVolon=document.querySelector("#"+this.config.id+" .btn_volon")?document.querySelector("#"+this.config.id+" .btn_volon"):document.createElement("div"),this.$uiBtnVoloff=document.querySelector("#"+this.config.id+" .btn_voloff")?document.querySelector("#"+this.config.id+" .btn_voloff"):document.createElement("div"),this.$uiDisplayTime=document.querySelector("#"+this.config.id+" .display_time")?document.querySelector("#"+this.config.id+" .display_time"):document.createElement("div"),this.$uiDisplayTimePar=document.querySelector("#"+this.config.id+" .display_time_par")?document.querySelector("#"+this.config.id+" .display_time_par"):document.createElement("div"),this.$uiDisplayPoster=document.querySelector("#"+this.config.id+" .display_poster")?document.querySelector("#"+this.config.id+" .display_poster"):document.createElement("div"),this.$uiDisplayName=document.querySelector("#"+this.config.id+" .display_name")?document.querySelector("#"+this.config.id+" .display_name"):document.createElement("div"),this.$uiBtnFull=document.querySelector("#"+this.config.id+" .btn_full")?document.querySelector("#"+this.config.id+" .btn_full"):document.createElement("div"),this.$uiSeekbarVol=document.querySelector("#"+this.config.id+" .seekbar_vol")?document.querySelector("#"+this.config.id+" .seekbar_vol"):document.createElement("div"),this.$uiSeekbarVolBg=document.querySelector("#"+this.config.id+" .seekbar_vol .seekbar_vol_bg")?document.querySelector("#"+this.config.id+" .seekbar_vol .seekbar_vol_bg"):document.createElement("div"),this.$uiSeekbarVolCover=document.querySelector("#"+this.config.id+" .seekbar_vol span")?document.querySelector("#"+this.config.id+" .seekbar_vol span"):document.createElement("div"),this.$uiSeekbarTime=document.querySelector("#"+this.config.id+" .seekbar_time")?document.querySelector("#"+this.config.id+" .seekbar_time"):document.createElement("div"),this.$uiSeekbarTimeBg=document.querySelector("#"+this.config.id+" .seekbar_time .seekbar_time_bg")?document.querySelector("#"+this.config.id+" .seekbar_time .seekbar_time_bg"):document.createElement("div"),this.$uiSeekbarTimeCover=document.querySelector("#"+this.config.id+" .seekbar_time span")?document.querySelector("#"+this.config.id+" .seekbar_time span"):document.createElement("div"),this.$uiBtnChange=document.querySelectorAll("#"+this.config.id+" .btn_change")?document.querySelectorAll("#"+this.config.id+" .btn_change"):document.createElement("div"),this.$uiBtnRound=document.querySelector("#"+this.config.id+" .btn_round")?document.querySelector("#"+this.config.id+" .btn_round"):document.createElement("div"),this.$uiBtnRoundSpan=document.querySelector("#"+this.config.id+" .btn_round span")?document.querySelector("#"+this.config.id+" .btn_round span"):document.createElement("div"),this.$uiBtnRoundSvg=document.querySelector("#"+this.config.id+" .btn_roundsvg")?document.querySelector("#"+this.config.id+" .btn_roundsvg"):document.createElement("div"),this.$uiBtnRoundSvgPath=document.querySelector("#"+this.config.id+" .btn_roundsvg .btn_roundsvg__path")?document.querySelector("#"+this.config.id+" .btn_roundsvg .btn_roundsvg__path"):document.createElement("div")}},{key:"EventPlay",value:function(){var e=this,t=this;if(null!==this.$uiBtnPlay&&0!==this.$uiBtnPlay.length)for(var i=0;i<this.$uiBtnPlay.length;++i)this.$uiBtnPlay[i].addEventListener("click",function(i){e.Player.paused()?t.Play():t.Pause()})}},{key:"EventPause",value:function(){var e=this;null!==this.$uiBtnPause&&this.$uiBtnPause.addEventListener("click",function(t){e.Pause()})}},{key:"EventStop",value:function(){var e=this;null!==this.$uiBtnStop&&this.$uiBtnStop.addEventListener("click",function(t){e.Stop()})}},{key:"EventMute",value:function(){var e=this;null!==this.$uiBtnMute&&this.$uiBtnMute.addEventListener("click",function(t){e.Player.muted()?(e.Player.muted(!1),e.Player.volume(1),e.$uiBtnMute.removeClass("active"),e.$uiSeekbarVolCover.style.width="100%"):(e.Player.muted(!0),e.Player.volume(0),e.$uiBtnMute.addClass("active"),e.$uiSeekbarVolCover.style.width="0%")})}},{key:"EventVolon",value:function(){var e=this;null!==this.$uiBtnVolon&&this.$uiBtnVolon.addEventListener("click",function(t){e.Player.muted(!1),e.Player.volume(1),e.$uiBtnVolon.removeClass("active"),e.$uiSeekbarVolCover.style.width="100%"})}},{key:"EventVoloff",value:function(){var e=this;null!==this.$uiBtnVoloff&&this.$uiBtnVoloff.addEventListener("click",function(t){e.Player.muted(!0),e.Player.volume(0),e.$uiBtnVoloff.addClass("active"),e.$uiSeekbarVolCover.style.width="0%"})}},{key:"EventBtnFull",value:function(){var e=this;null!==this.$uiBtnFull&&this.$uiBtnFull.addEventListener("click",function(t){e.Player.requestFullscreen()})}},{key:"EventSeekbarVol",value:function(){var e=this;if(null!==this.$uiSeekbarVol){var t=!1;this.$uiSeekbarVolCover.style.width="100%",this.$uiSeekbarVol.addEventListener("mousedown",function(i){t=!0;var n=e.$uiSeekbarVol.clientWidth,o=e.$uiSeekbarVol.getBoundingClientRect().left,a=(i.pageX-o)/n;e.Player.volume(a)}),this.$uiSeekbarVol.addEventListener("mouseleave",function(e){t=!1}),this.$uiSeekbarVol.addEventListener("mouseup",function(e){t=!1}),this.$uiSeekbarVol.addEventListener("mousemove",function(i){if(t===!0){var n=e.$uiSeekbarVol.clientWidth,o=e.$uiSeekbarVol.getBoundingClientRect().left,a=(i.pageX-o)/n;e.Player.volume(a)}})}}},{key:"EventSeekbarTime",value:function(){var e=this,t=this;if(null!==this.$uiSeekbarTime){var i=!1;this.$uiSeekbarTime.addEventListener("mousedown",function(n){i=!0,t.Pause();var o=e.$uiSeekbarTime.clientWidth,a=e.$uiSeekbarTime.getBoundingClientRect().left,l=(n.pageX-a)/o,r=e.Player.duration()*l;e.$uiSeekbarTimeCover.style.width=100*l+"%",e.Player.currentTime(r)}),this.$uiSeekbarTime.addEventListener("mouseleave",function(t){if(i===!0){if(e.Player.play(),null!==e.$uiBtnPlay&&0!==e.$uiBtnPlay.length)for(var n=0;n<e.$uiBtnPlay.length;++n)e.$uiBtnPlay[n].addClass("active");e.$uiBtnPause.addClass("active")}i=!1}),this.$uiSeekbarTime.addEventListener("mouseup",function(t){if(i===!0){if(e.Player.play(),null!==e.$uiBtnPlay&&0!==e.$uiBtnPlay.length)for(var n=0;n<e.$uiBtnPlay.length;++n)e.$uiBtnPlay[n].addClass("active");e.$uiBtnPause.addClass("active")}i=!1}),this.$uiSeekbarTime.addEventListener("mousemove",function(t){if(i===!0){var n=e.$uiSeekbarTime.clientWidth,o=e.$uiSeekbarTime.getBoundingClientRect().left,a=(t.pageX-o)/n,l=e.Player.duration()*a;e.$uiSeekbarTimeCover.style.width=100*a+"%",e.Player.currentTime(l)}})}if(null!==this.$uiBtnRound&&this.$uiBtnRound.addEventListener("click",function(i){t.Pause();var n=e.$uiBtnRound.clientWidth,o=n/2,a=e.$uiBtnRound.getBoundingClientRect().left,l=e.$uiBtnRound.getBoundingClientRect().top,r=i.pageX-a-o,s=i.pageY-(l+window.pageYOffset)-o,u=180*Math.atan2(s,r)/Math.PI;u>=-90&&u<=0?u+=90:u>=0&&u<=90?u+=90:u>=90&&u<=180?u+=90:u>=-180&&u<=-90&&(u=u+360+90),e.Player.currentTime(e.Player.duration()*(u/360)),e.$uiBtnRoundSpan.style.webkitTransform="rotate("+u+"deg)",e.Player.play()}),null!==this.$uiBtnRoundSvg){var n=3.14*this.$uiBtnRoundSvg.clientWidth;this.$uiBtnRoundSvg.addEventListener("click",function(i){t.Pause();var o=e.$uiBtnRoundSvg.clientWidth,a=o/2,l=e.$uiBtnRoundSvg.getBoundingClientRect().left,r=e.$uiBtnRoundSvg.getBoundingClientRect().top,s=i.pageX-l-a,u=i.pageY-(r+window.pageYOffset)-a,d=180*Math.atan2(u,s)/Math.PI;d>=-90&&d<=0?d+=90:d>=0&&d<=90?d+=90:d>=90&&d<=180?d+=90:d>=-180&&d<=-90&&(d=d+360+90),e.Player.currentTime(e.Player.duration()*(d/360)),e.$uiBtnRoundSvgPath.style.cssText="stroke-dashoffset: "+(n+10-d/365*n)+";",e.Player.play()})}}},{key:"EventChangeVideo",value:function(){var e=this;if(null!==this.$uiBtnChange&&0!==this.$uiBtnChange.length)for(var t=0;t<this.$uiBtnChange.length;++t)this.$uiBtnChange[t].addEventListener("click",function(t){var i=t.currentTarget.dataset.pmbId;e.Change(i)})}},{key:"Play",value:function(){var e=this;if(null!==this.$uiBtnPlay&&0!==this.$uiBtnPlay.length)if(this.Player.paused()){if(this.Player.play(),null!==this.$uiBtnPlay&&0!==this.$uiBtnPlay.length)for(var t=0;t<this.$uiBtnPlay.length;++t)this.$uiBtnPlay[t].addClass("active");this.$uiBtnPause.addClass("active")}else{if(e.Pause(),null!==this.$uiBtnPlay&&0!==this.$uiBtnPlay.length)for(var t=0;t<this.$uiBtnPlay.length;++t)this.$uiBtnPlay[t].removeClass("active");this.$uiBtnPause.removeClass("active")}}},{key:"Stop",value:function(){if(this.Pause(),this.Player.currentTime(0),this.StopAll(),null!==this.$uiBtnPlay&&0!==this.$uiBtnPlay.length)for(var e=0;e<this.$uiBtnPlay.length;++e)this.$uiBtnPlay[e].removeClass("active");this.$uiBtnPause.removeClass("active");var t=Array.prototype.slice.call(document.querySelectorAll("[data-PMB-id]"));t&&t.forEach(function(e,t){e.removeClass("active")})}},{key:"Pause",value:function(){if(this.Player.pause(),null!==this.$uiBtnPlay&&0!==this.$uiBtnPlay.length)for(var e=0;e<this.$uiBtnPlay.length;++e)this.$uiBtnPlay[e].removeClass("active");this.$uiBtnPause.removeClass("active");var t=Array.prototype.slice.call(document.querySelectorAll("[data-PMB-id]"));t&&t.forEach(function(e,t){e.removeClass("active")})}},{key:"Change",value:function(e){var t=this,i=this;if(""!=e&&null!=e&&void 0!=e){if(document.querySelector('[data-PMB-id="'+e+'"]')&&document.querySelector('[data-PMB-id="'+e+'"]').hasClass("active"))return void i.Pause();this.Player.muted(!0),this.Player.play(),this.Player.catalog.getVideo(e,function(i,n){if(t.Player.catalog.load(n),t.Player.play(),t.Player.muted(!1),null!==t.$uiBtnPlay&&0!==t.$uiBtnPlay.length)for(var o=0;o<t.$uiBtnPlay.length;++o)t.$uiBtnPlay[o].addClass("active");t.$uiBtnPause.addClass("active");var a=Array.prototype.slice.call(document.querySelectorAll("[data-PMB-id]")),l=document.querySelector('[data-PMB-id="'+e+'"]');a&&a.forEach(function(e,t){e.removeClass("active")}),l&&l.addClass("active"),t.playerVideo.id=n.id,t.playerVideo.name=n.name,t.playerVideo.description=n.description,t.playerVideo.duration=n.duration,t.playerVideo.thumbnail=n.thumbnail,t.PlayerMediaInfo=t.Player.mediainfo,t.SetInfo()})}}},{key:"StopAll",value:function(){for(var e in window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST)videojs(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[e]).pause(),videojs(window.PLAYER_MODULE_BRIGHTCOVE_PLATLIST[e]).currentTime(0)}},{key:"GetTime",value:function(){function e(e){return"number"==typeof e&&(e=String(e)),e<10?"0"+e:e>=10?e:void 0}var t=e(Math.floor(this.Player.currentTime()/60)),i=e(Math.floor(this.Player.currentTime()%60));return t+":"+i}},{key:"GetTimeMax",value:function(){function e(e){return"number"==typeof e&&(e=String(e)),e<10?"0"+e:e>=10?e:void 0}var t=e(Math.floor(this.Player.duration()/60)),i=e(Math.floor(this.Player.duration()%60));return t+":"+i}},{key:"GetInfo",value:function(){return this.PlayerMediaInfo}},{key:"GetTimeRatio",value:function(){return Math.floor(this.Player.currentTime()/this.Player.duration()*1e3)/1e3}},{key:"GetTimePar",value:function(){return Math.floor(this.Player.currentTime()/this.Player.duration()*1e3)/10+"%"}},{key:"GetUrlPoster",value:function(){return this.Player.poster()}},{key:"SetInfo",value:function(){this.$uiDisplayPoster.innerHTML=this.PlayerMediaInfo.name}},{key:"SetUrlPoster",value:function(e){this.Player.poster(e)}},{key:"Destroy",value:function(){this.Player.reset()}}]),e}();window.PLAYER_MODULE_BRIGHTCOVE=e||{}}(window);