import { PlayerDomCache } from '../dom/dom-cache';
import { PlayerConfig } from '../types';
import { isTouchDevice } from '../utils/util';

const PREPLAY_SEEK_TOLERANCE_SECONDS = 0.25;
const PREPLAY_SEEK_STABLE_UPDATE_COUNT = 2;

export interface PlayerEventContext {
  CONFIG: PlayerConfig;
  Player: any;
  PlayerChangeSeekingFlg: boolean;
  $: PlayerDomCache;
  Play(forceplay?: boolean, callback?: () => {}): void;
  Pause(callback?: () => {}): void;
  Stop(callback?: () => {}): void;
  Mute(): void;
  SetVolume(vol?: number | 'off'): boolean | void;
  Change(id: any, isplay?: boolean | null, callback?: () => {}): boolean | void;
  Update(currentTimeOverride?: number): void;
}

function clampSeekbarRatio(ratio: number): number {
  if(ratio >= 1) return 1;
  if(ratio <= 0) return 0;
  return ratio;
}

export function getSeekbarRatio(target: HTMLElement, clientX: number): number {
  const rect = target.getBoundingClientRect();
  const width = rect.width || target.clientWidth;

  if(!width) return 0;

  return clampSeekbarRatio((clientX - rect.left) / width);
}

export function bindEventPlay(context: PlayerEventContext, DOM: any): void {
  if(context.$.uiBtnPlay){
    DOM.addEvent(context.$.uiBtnPlay, 'click' , () => {
      if(context.Player.paused()){
        context.Play();
      } else {
        context.Pause();
      }
    });
  }
}

export function bindEventPause(context: PlayerEventContext, DOM: any): void {
  if(context.$.uiBtnPause){
    DOM.addEvent(context.$.uiBtnPause, 'click' , () => {
      context.Pause();
    });
  }
}

export function bindEventStop(context: PlayerEventContext, DOM: any): void {
  if(context.$.uiBtnStop){
    DOM.addEvent(context.$.uiBtnStop, 'click' , () => {
      context.Stop();
    });
  }

  DOM.addEvent(window, 'blur' , () => {
    if(context.CONFIG.stop_outfocus) context.Stop();
  });
}

export function bindEventMute(context: PlayerEventContext, DOM: any): void {
  if(context.$.uiBtnMute){
    DOM.addEvent(context.$.uiBtnMute, 'click' , () => {
      context.Mute();
    });
  }
}

export function bindEventVolon(context: PlayerEventContext, DOM: any): void {
  if(context.$.uiBtnVolon){
    DOM.addEvent(context.$.uiBtnVolon, 'click' , () => {
      context.SetVolume(context.CONFIG.volume);
      DOM.removeClass(context.$.uiBtnVolon, context.CONFIG.classname_active);
    });
  }
}

export function bindEventVoloff(context: PlayerEventContext, DOM: any): void {
  if(context.$.uiBtnVoloff){
    DOM.addEvent(context.$.uiBtnVoloff, 'click' , () => {
      context.SetVolume('off');
      DOM.addClass(context.$.uiBtnVoloff, context.CONFIG.classname_active);
    });
  }
}

/**
 * When dragging a seek bar(volume).
 */
export function bindEventSeekbarVol(context: PlayerEventContext, DOM: any): void {
  if(context.$.uiSeekbarVol){

    let _flag = false;
    let _targetWidth = 0;

    DOM.setStyle( context.$.uiSeekbarVolCover, { width : 100 + '%' } );

    DOM.addEvent(context.$.uiSeekbarVol, 'mousedown' , (event: MouseEvent) => {
      _flag = true;
      let _target  = event.currentTarget as HTMLElement;
      let _currentWidth  = _target.clientWidth;
      let _clickPosition = _target.getBoundingClientRect().left;
      _targetWidth       = (event.pageX - _clickPosition) / _currentWidth;
      context.SetVolume(_targetWidth);
    });

    DOM.addEvent(context.$.uiSeekbarVol, 'mouseleave' , () => {
      _flag = false;
    });
    DOM.addEvent(context.$.uiSeekbarVol, 'mouseup' , () => {
      _flag = false;
    });

    DOM.addEvent(context.$.uiSeekbarVol, 'mousemove' , (event: MouseEvent) => {
      if(_flag === true){
        let _target  = event.currentTarget as HTMLElement;
        let _currentWidth  = _target.clientWidth;
        let _clickPosition = _target.getBoundingClientRect().left;
        _targetWidth       = (event.pageX - _clickPosition) / _currentWidth;
        if(context.Player.muted()){
          context.Player.muted(false);
        }
        context.SetVolume(_targetWidth);
      }
    });
  }
}

/**
 * When dragging a seek bar(time).
 */
export function bindEventSeekbarTime(context: PlayerEventContext, DOM: any): void {

  if(context.$.uiSeekbarTime){

    let _targetTime = 0;

    // Setting currentTime before the first playback can prevent progress updates
    // on iOS Safari. Defer the actual seek until playback starts and keep the
    // requested position rendered while the player settles at the target.
    let pendingPreplaySeekTime: number | null = null;
    let preplaySeekTargetTime: number | null = null;
    let preplaySeekStableUpdates = 0;

    const completePreplaySeek = () => {
      if(preplaySeekTargetTime === null) return;

      preplaySeekTargetTime = null;
      preplaySeekStableUpdates = 0;
      context.PlayerChangeSeekingFlg = false;
      context.Update();
    };

    const tryCompletePreplaySeek = () => {
      if(preplaySeekTargetTime === null) return;

      const currentTime = context.Player.currentTime();
      if(Number.isFinite(currentTime) && currentTime >= preplaySeekTargetTime - PREPLAY_SEEK_TOLERANCE_SECONDS){
        // A single update may briefly reach the target and then jump backward.
        preplaySeekStableUpdates += 1;
      } else {
        preplaySeekStableUpdates = 0;
      }

      if(preplaySeekStableUpdates >= PREPLAY_SEEK_STABLE_UPDATE_COUNT){
        completePreplaySeek();
      }
    };

    context.Player.on('play', () => {
      if(pendingPreplaySeekTime === null) return;

      const preplaySeekTime = pendingPreplaySeekTime;
      pendingPreplaySeekTime = null;
      preplaySeekTargetTime = preplaySeekTime;
      preplaySeekStableUpdates = 0;
      context.PlayerChangeSeekingFlg = true;
      context.Update(preplaySeekTime);
      context.Player.currentTime(preplaySeekTime);
    });

    context.Player.on('timeupdate', tryCompletePreplaySeek);

    const updateSeekPosition = (target: HTMLElement, clientX: number) => {
      const targetWidth = getSeekbarRatio(target, clientX);
      const duration = context.Player.duration();

      if(!Number.isFinite(duration)) return;

      _targetTime = duration * targetWidth;
      DOM.setStyle(context.$.uiSeekbarTimeCover, { width: (targetWidth * 100) + '%' });

      if(typeof context.Player.hasStarted === 'function' && !context.Player.hasStarted()){
        pendingPreplaySeekTime = _targetTime;
      } else {
        context.Player.currentTime(_targetTime);
      }

      context.Update(_targetTime);
    };

    const finishSeeking = () => {
      if(!context.PlayerChangeSeekingFlg) return;

      if(pendingPreplaySeekTime !== null){
        context.Update(_targetTime);
        return;
      }

      context.PlayerChangeSeekingFlg = false;
      context.Update(_targetTime);
    };

    if(!isTouchDevice()){
      DOM.addEvent(context.$.uiSeekbarTime, 'mousedown', (event: MouseEvent) => {
        context.PlayerChangeSeekingFlg = true;
        updateSeekPosition(event.currentTarget as HTMLElement, event.clientX);
      });

      DOM.addEvent(context.$.uiSeekbarTime, 'mouseleave', finishSeeking);

      DOM.addEvent(context.$.uiSeekbarTime, 'mouseup', finishSeeking);
      DOM.addEvent(window, 'mouseup', finishSeeking);

      DOM.addEvent(context.$.uiSeekbarTime, 'mousemove', (event: MouseEvent) => {
        if(context.PlayerChangeSeekingFlg){
          updateSeekPosition(event.currentTarget as HTMLElement, event.clientX);
        }
      });

    } else {

      DOM.addEvent(context.$.uiSeekbarTime, 'touchstart', (event: TouchEvent) => {
        context.PlayerChangeSeekingFlg = true;
        updateSeekPosition(event.currentTarget as HTMLElement, event.touches[0].clientX);
      });

      DOM.addEvent(context.$.uiSeekbarTime, 'touchcancel', finishSeeking);

      DOM.addEvent(context.$.uiSeekbarTime, 'touchend', finishSeeking);
      DOM.addEvent(window, 'touchcancel', finishSeeking);
      DOM.addEvent(window, 'touchend', finishSeeking);

      DOM.addEvent(context.$.uiSeekbarTime, 'touchmove', (event: TouchEvent) => {
        if(context.PlayerChangeSeekingFlg){
          updateSeekPosition(event.currentTarget as HTMLElement, event.touches[0].clientX);
        }
      });

    }

  }
}

export function bindEventChangeVideo(context: PlayerEventContext, DOM: any): void {
  if(context.$.uiBtnChange){
    DOM.addEvent(context.$.uiBtnChange, 'click' , (event: MouseEvent) => {
      // Get video-id.
      // -> <data-pmb-id="">
      let _target = event.currentTarget as HTMLElement;
      let id = _target.dataset.pmbId;
      context.Change(id);
    });
  }
}
