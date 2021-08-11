
export let viewPlayerMain = `
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
  {{playsinline}}
  {{loop}}
  {{muted}}
></video>
`;

export let viewPlayerUi = `
  <div class="display_time">00:00</div>
  <div class="display_time_now">00</div>
  <div class="display_time_total">00</div>
  <div class="display_time_par">0%</div>
  <button class="btn_play btn">play</button>
  <button class="btn_pause btn">pause</button>
  <button class="btn_stop btn">stop</button>
  <button class="btn_mute btn">mute</button>
  <div class="seekbar_time"><div class="seekbar_time_bg"></div><span></span></div>
  <div class="seekbar_vol"><div class="seekbar_vol_bg"></div><span></span></div>
  <button class="btn_volon btn">volume on</button>
  <button class="btn_voloff btn">volume off</button>
  <div class="display_poster"><img src="" alt=""></div>
  <div class="display_poster_background"></div>
  <div class="display_name"></div>
`;

