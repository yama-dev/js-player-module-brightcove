import { PlayerDomCache } from '../dom/dom-cache';
import { PlayerCallbacks, PlayerConfig } from '../types';

export interface PlayerControlContext {
  instance: any;
  player: any;
  config: PlayerConfig;
  callbacks: PlayerCallbacks;
  cache: PlayerDomCache;
  classOn(): void;
  classOff(): void;
  pause(callback?: () => {}): void;
  setVolume(vol?: number | 'off'): boolean | void;
}

export function playPlayer(context: PlayerControlContext, forceplay?: boolean, callback?: () => {}): void {
  if(context.player.paused() || forceplay == true){
    if(!context.callbacks.PlayPrep && callback) context.callbacks.PlayPrep = callback;
    if(context.callbacks.PlayPrep && typeof(context.callbacks.PlayPrep) === 'function') {
      context.callbacks.PlayPrep(context.instance, context.player);
    }

    // When the player is stopped.
    context.player.play();
    context.classOn();

    if(!context.callbacks.Play && callback) context.callbacks.Play = callback;
    if(context.callbacks.Play && typeof(context.callbacks.Play) === 'function') {
      context.callbacks.Play(context.instance, context.player);
    }
  } else {
    // When the player is playing.
    context.pause();
    context.classOff();
  }
}

export function stopPlayer(context: PlayerControlContext, callback?: () => {}): void {
  context.player.pause();
  context.player.currentTime(0);
  context.classOff();

  if(!context.callbacks.Stop && callback) context.callbacks.Stop = callback;
  if(context.callbacks.Stop && typeof(context.callbacks.Stop) === 'function') {
    context.callbacks.Stop(context.instance, context.player);
  }
}

export function pausePlayer(context: PlayerControlContext, callback?: () => {}): void {
  context.player.pause();
  context.classOff();

  if(!context.callbacks.Pause && callback) context.callbacks.Pause = callback;
  if(context.callbacks.Pause && typeof(context.callbacks.Pause) === 'function') {
    context.callbacks.Pause(context.instance, context.player);
  }
}

export function mutePlayer(context: PlayerControlContext, DOM: any): void {
  if(context.player.muted()){
    context.player.muted(false);
    context.setVolume(context.config.volume);
    DOM.removeClass(context.cache.uiBtnMute, context.config.classname_active);
  }else{
    context.player.muted(true);
    context.player.volume(0);
    DOM.addClass(context.cache.uiBtnMute, context.config.classname_active);
  }
}

export function seekPlayerTo(player: any, sec: any): boolean | void {
  if(typeof sec == 'string') sec = Number(sec);
  if(typeof sec !== 'number' || !Number.isFinite(sec)) return false;

  const duration = player.duration();
  if(!Number.isFinite(duration)) return false;

  player.currentTime(Math.min(Math.max(sec, 0), duration));
}

export function seekPlayerBy(player: any, sec: any): boolean | void {
  if(typeof sec == 'string') sec = Number(sec);
  if(typeof sec !== 'number' || !Number.isFinite(sec) || sec === 0) return false;

  const duration = player.duration();
  const currentTime = player.currentTime();

  if(!Number.isFinite(duration) || !Number.isFinite(currentTime)) return false;

  player.currentTime(Math.min(Math.max(currentTime + sec, 0), duration));
}

export function getPlayerPlaybackRate(player: any): number {
  return player.playbackRate();
}

export function setPlayerPlaybackRate(player: any, rate: any): boolean | void {
  if(typeof rate == 'string') rate = Number(rate);
  if(typeof rate !== 'number' || !Number.isFinite(rate)) return false;
  if(rate < 0.5 || rate > 2) return false;

  player.playbackRate(rate);
}

export function setPlayerVolume(player: any, config: PlayerConfig, vol?: number | 'off'): boolean | void {
  if(vol === 'off'){
    player.volume(0);
  }
  if(typeof vol === 'number'){
    if(Number(vol) < 0 || 1 < Number(vol)) return false;
    config.volume = Number(vol);
    player.volume(config.volume);
  }
}
