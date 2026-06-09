import {
  PlayerCallbacks,
  PlayerConfig,
  PlayerOptions
} from './types';

export const DEFAULT_CALLBACKS: PlayerCallbacks = {
  PlayerInit  : null,
  PlayerEnded : null,
  PlayerPlay  : null,
  PlayerPause : null,

  TimeUpdate : null,
  VolumeChange : null,
  PlaybackRateChange : null,

  PlayPrep: null,
  Play    : null,
  Pause   : null,
  Stop    : null,
  PauseAll: null,
  StopAll : null,
  Change  : null,
};

export const DEFAULT_CONFIG: PlayerConfig = {
  mode           : 'movie',
  id             : 'pmb',

  player_id        : 'pmb_player',
  player_id_wrap   : 'pmb_player_wrap',
  player_ui_id     : 'pmb_ui',
  player_style_id  : 'pmb_style',

  videoid        : '',
  account        : '',
  width          : '',
  height         : '',

  video_title    : '',

  player         : 'default',
  volume         : 1,

  playsinline    : 'webkit-playsinline playsinline',
  loop           : '',
  muted          : '',

  ui_controls    : '',
  ui_autoplay    : '',
  ui_default     : false,
  ui_default_css : true,
  pause_others_on_play : false,

  stop_outfocus  : false,
  poster         : '',

  add_style        : '',
  classname_loaded_wrap : 'is-pmb-loaded-wrap',
  classname_active_wrap : 'is-pmb-active-wrap',
  classname_active : 'is-pmb-active'
};

export function createPlayerConfig(options: PlayerOptions): PlayerConfig {
  const id = options.id || 'pmb';

  return {
    mode           : options.mode || 'movie',
    id,

    player_id        : `${id}_player`,
    player_id_wrap   : `${id}_player_wrap`,
    player_ui_id     : `${id}_ui`,
    player_style_id  : `${id}_style`,

    videoid        : options.videoid || '4929511769001',
    account        : options.account || '',
    width          : options.width || '',
    height         : options.height || '',

    video_title    : options.video_title || '',

    player         : options.player || 'default',
    volume         : options.volume === undefined ? 1 : options.volume,

    playsinline    : options.playsinline !== false ? 'webkit-playsinline playsinline' : '',
    loop           : options.loop === true ? 'loop' : '',
    muted          : options.muted === true ? 'muted' : '',

    ui_controls    : options.ui_controls === true ? 'controls' : '',
    ui_autoplay    : options.ui_autoplay === true ? 'autoplay' : '',
    ui_default     : options.ui_default === false ? false : true,
    ui_default_css : options.ui_default_css === false ? false : true,
    pause_others_on_play : options.pause_others_on_play === true,

    stop_outfocus  : options.stop_outfocus === true ? true : false,
    poster         : options.poster || '',

    add_style        : options.add_style || '',
    classname_loaded_wrap : options.classname_loaded_wrap || 'is-pmb-loaded-wrap',
    classname_active_wrap : options.classname_active_wrap || 'is-pmb-active-wrap',
    classname_active : options.classname_active || 'is-pmb-active'
  };
}
