
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
  {{title}}
  {{ui_controls}}
  {{ui_autoplay}}
  {{playsinline}}
  {{loop}}
  {{muted}}
  {{poster}}
></video>
`;

export let viewPlayerUi = `
  <div class="ui-time"></div>
  <div class="ui-time-now"></div>
  <div class="ui-time-down"></div>
  <div class="ui-time-total"></div>
  <div class="ui-time-par"></div>

  <button class="ui-btn-play btn">play</button>
  <button class="ui-btn-pause btn">pause</button>
  <button class="ui-btn-stop btn">stop</button>
  <button class="ui-btn-mute btn">mute</button>

  <div class="ui-seekbar-time"><div class="ui-seekbar-time-bg"></div><span></span></div>
  <div class="ui-seekbar-vol"><div class="ui-seekbar-vol-bg"></div><span></span></div>

  <button class="ui-btn-volon btn">volume on</button>
  <button class="ui-btn-voloff btn">volume off</button>

  <div class="ui-poster"><img src="" alt=""></div>
  <div class="ui-poster-background"></div>
  <div class="ui-name"></div>
`;

