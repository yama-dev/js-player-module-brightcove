import { PlayerDomCache } from '../dom/dom-cache';
import { PlayerConfig } from '../types';
import { isTouchDevice } from '../utils/util';

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

    if(!isTouchDevice()){
      DOM.addEvent(context.$.uiSeekbarTime, 'mousedown', (event: MouseEvent) => {
        context.PlayerChangeSeekingFlg = true;
        let _target        = event.currentTarget as HTMLElement;
        let _currentWidth  = _target.clientWidth;
        let _clickPosition = _target.getBoundingClientRect().left;
        let _targetWidth   = (event.pageX - _clickPosition) / _currentWidth;
        _targetTime = context.Player.duration() * _targetWidth;
        DOM.setStyle( context.$.uiSeekbarTimeCover, { width : (_targetWidth * 100) + '%' } );
        context.Player.currentTime(_targetTime);
      });

      DOM.addEvent(context.$.uiSeekbarTime, 'mouseleave', () => {
        if(context.PlayerChangeSeekingFlg){
          context.Play();
          setTimeout(()=>{
            context.Play();
            context.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      DOM.addEvent(context.$.uiSeekbarTime, 'mouseup', () => {
        if(context.PlayerChangeSeekingFlg){
          context.Play();
          setTimeout(()=>{
            context.Play();
            context.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      DOM.addEvent(context.$.uiSeekbarTime, 'mousemove', (event: MouseEvent) => {
        if(context.PlayerChangeSeekingFlg){
          let _target        = event.currentTarget as HTMLElement;
          let _currentWidth  = _target.clientWidth;
          let _clickPosition = _target.getBoundingClientRect().left;
          let _targetWidth   = (event.pageX - _clickPosition) / _currentWidth;
          _targetTime    = context.Player.duration() * _targetWidth;

          if(_targetWidth >= 1) _targetWidth = 1;
          if(_targetWidth <= 0) _targetWidth = 0;

          DOM.setStyle( context.$.uiSeekbarTimeCover, { width : (_targetWidth * 100) + '%' } );
          context.Player.currentTime(_targetTime);
        }
      });

    } else {

      DOM.addEvent(context.$.uiSeekbarTime, 'touchstart', (event: TouchEvent) => {
        context.PlayerChangeSeekingFlg = true;
        let _target        = event.touches[0].target as HTMLElement;
        let _currentWidth  = _target.clientWidth;
        let _clickPosition = _target.getBoundingClientRect().left;
        let _targetWidth   = (event.touches[0].pageX - _clickPosition) / _currentWidth;
        _targetTime = context.Player.duration() * _targetWidth;
        DOM.setStyle( context.$.uiSeekbarTimeCover, { width : (_targetWidth * 100) + '%' } );
        context.Player.currentTime(_targetTime);
      });

      DOM.addEvent(context.$.uiSeekbarTime, 'touchcancel', () => {
        if(context.PlayerChangeSeekingFlg){
          context.Play();
          setTimeout(()=>{
            context.Play();
            context.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      DOM.addEvent(context.$.uiSeekbarTime, 'touchend', () => {
        if(context.PlayerChangeSeekingFlg){
          context.Play();
          setTimeout(()=>{
            context.Play();
            context.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      DOM.addEvent(context.$.uiSeekbarTime, 'touchmove', (event: TouchEvent) => {
        if(context.PlayerChangeSeekingFlg){
          let _target        = event.touches[0].target as HTMLElement;
          let _currentWidth  = _target.clientWidth;
          let _clickPosition = _target.getBoundingClientRect().left;
          let _targetWidth   = (event.touches[0].pageX - _clickPosition) / _currentWidth;
          _targetTime    = context.Player.duration() * _targetWidth;

          if(_targetWidth >= 1) _targetWidth = 1;
          if(_targetWidth <= 0) _targetWidth = 0;

          DOM.setStyle( context.$.uiSeekbarTimeCover, { width : (_targetWidth * 100) + '%' } );
          context.Player.currentTime(_targetTime);
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
