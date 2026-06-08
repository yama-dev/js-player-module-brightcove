export type PlayerMode = 'movie' | 'audio' | string;

export type PlayerCallback = (instance: any, player: any) => void;

export type TimeUpdateCallback = (time: {
  current: string;
  max: string;
  down: string;
  ratio: number;
  par: string;
}) => void;

export type VolumeChangeCallback = (volume: {
  volume: number;
  par: number;
}) => void;

export interface PlayerCallbacks {
  PlayerInit: PlayerCallback | null;
  PlayerEnded: PlayerCallback | null;
  PlayerPlay: PlayerCallback | null;
  PlayerPause: PlayerCallback | null;
  TimeUpdate: TimeUpdateCallback | null;
  VolumeChange: VolumeChangeCallback | null;
  PlayPrep: PlayerCallback | null;
  Play: PlayerCallback | null;
  Pause: PlayerCallback | null;
  Stop: PlayerCallback | null;
  PauseAll: PlayerCallback | null;
  StopAll: PlayerCallback | null;
  Change: PlayerCallback | null;
}

export interface PlayerOptions {
  mode?: PlayerMode;
  id?: string;
  videoid?: string;
  account?: string;
  width?: string;
  height?: string;
  video_title?: string;
  player?: string;
  volume?: number;
  playsinline?: boolean;
  loop?: boolean;
  muted?: boolean;
  ui_controls?: boolean;
  ui_autoplay?: boolean;
  ui_default?: boolean;
  ui_default_css?: boolean;
  pause_others_on_play?: boolean;
  stop_outfocus?: boolean;
  poster?: string;
  add_style?: string;
  classname_loaded_wrap?: string;
  classname_active_wrap?: string;
  classname_active?: string;
  on?: Partial<PlayerCallbacks>;
}

export interface PlayerConfig {
  mode: PlayerMode;
  id: string;
  player_id: string;
  player_id_wrap: string;
  player_ui_id: string;
  player_style_id: string;
  videoid: string;
  account: string;
  width: string;
  height: string;
  video_title: string;
  player: string;
  volume: number;
  playsinline: string;
  loop: string;
  muted: string;
  ui_controls: string;
  ui_autoplay: string;
  ui_default: boolean;
  ui_default_css: boolean;
  pause_others_on_play: boolean;
  stop_outfocus: boolean;
  poster: string;
  add_style: string;
  classname_loaded_wrap: string;
  classname_active_wrap: string;
  classname_active: string;
}
