/*
 *
 * viewPlayerScriptcode
 * viewPlayer
 * viewPlayerUi
 * viewPlayerStyle
 *
 */

export let viewPlayerScriptcode = '//players.brightcove.net/{{ account }}/{{ player }}_default/index.min.js';

export let viewPlayer = `
<video id="{{ player_id }}"
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

export let viewPlayerUi = `
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
  <div class="display_name"></div>
`;

export let viewPlayerStyle = `
#{{ id }} {
  position: relative;
}
#{{ id }} .on {
  display: none;
}
#{{ id }} .off {
  display: block;
}
#{{ id }} .btn_play {
  width: 120px;
  height: 30px;
  display: block;
  cursor: pointer;
}
#{{ id }} .btn_play.active {
  display: none;
}
#{{ id }} .btn_play:hover .on {
  display: block;
}
#{{ id }} .btn_play:hover .off {
  display: none;
}
#{{ id }} .btn_pause {
  width: 120px;
  height: 30px;
  display: none;
  cursor: pointer;
}
#{{ id }} .btn_pause.active {
  display: block;
}
#{{ id }} .btn_pause:hover .on {
  display: block;
}
#{{ id }} .btn_pause:hover .off {
  display: none;
}
#{{ id }} .btn_stop {
  width: 120px;
  height: 30px;
  cursor: pointer;
}
#{{ id }} .btn_stop.active {
  display: block;
}
#{{ id }} .btn_stop:hover .on {
  display: block;
}
#{{ id }} .btn_stop:hover .off {
  display: none;
}
#{{ id }} .btn_mute {
  width: 120px;
  height: 30px;
  cursor: pointer;
}
#{{ id }} .btn_mute.active .on {
  display: block;
}
#{{ id }} .btn_mute.active .off {
  display: none;
}
#{{ id }} .seekbar_vol {
  width: 100%;
  height: 9px;
  padding: 2px 0;
  position: relative;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#{{ id }} .seekbar_vol .seekbar_vol_bg {
  width: 100%;
  height: 5px;
  background: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  margin: 2px 0;
}
#{{ id }} .seekbar_vol span {
  display: block;
  width: 0%;
  height: 100%;
  background: #666;
  position: relative;
}
#{{ id }} .seekbar_time {
  width: 100%;
  height: 9px;
  padding: 2px 0;
  position: relative;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#{{ id }} .seekbar_time .seekbar_time_bg {
  width: 100%;
  height: 5px;
  background: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  margin: 2px 0;
}
#{{ id }} .seekbar_time span {
  display: block;
  width: 0%;
  height: 100%;
  background: #666;
  position: relative;
}
`;
