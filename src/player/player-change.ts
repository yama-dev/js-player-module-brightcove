import { PlayerDomCache } from '../dom/dom-cache';
import { PlayerCallbacks, PlayerConfig } from '../types';

export interface PlayerChangeContext {
  instance: any;
  player: any;
  config: PlayerConfig;
  callbacks: PlayerCallbacks;
  cache: PlayerDomCache;
  isPlayerChangeLoad(): boolean;
  setPlayerChangeLoad(loadable: boolean): void;
  setInfo(): void;
  setPoster(): void;
  classOff(): void;
  play(forceplay?: boolean, callback?: () => {}): void;
}

export function changePlayerMedia(
  context: PlayerChangeContext,
  DOM: any,
  id: any,
  isplay: boolean | null = null,
  callback?: () => {}
): boolean | void {
  // 動画IDが取得出来ない場合は処理を中止
  if(id == '' || id == null || id == undefined) return;

  if(!context.isPlayerChangeLoad()) return false;

  let _change_prev_paused = context.player.paused();
  let _change_prev_muted = context.player.muted();
  // if(isplay === true || isplay === false) _change_prev_paused = !isplay;

  // Check if it is the same media.
  if(context.config.videoid !== id){

    context.setPlayerChangeLoad(false);

    // Overwrite video id.
    context.config.videoid = id;

    // Reset playback position once in click event propagation.
    // exclud IE, Edge, for there is a bugs
    let _ua = window.navigator.userAgent.toLowerCase();
    if(_ua.indexOf('msie') == -1 && _ua.indexOf('trident') == -1 && _ua.indexOf('edge') == -1) {
      // context.player.currentTime(0);
    }

    // Run playback start processing once in the click event propagation.
    if(_change_prev_paused){
      // context.player.play();
    }
    if(_change_prev_muted){
      context.player.muted(true);
    }

    if(context.cache.playerElem) DOM.removeClass(context.cache.playerElem, context.config.classname_loaded_wrap);

    context.player.catalog.getVideo(id, (error: any, video: any) => {

      // reload palyer data.
      context.player.catalog.load(video);

      // Set MediaInfo
      context.setInfo();
      context.setPoster();

      // replay after data change.
      setTimeout( () => {
        context.classOff();
        if(_change_prev_paused === false){
          context.play(true);
        } else {
          if(isplay === true){
            context.play(true);
          }
        }
        if(_change_prev_muted === false){
          context.player.muted(false);
        }
      }, 100);

      setTimeout( () => {
        if(!context.callbacks.Change && callback) context.callbacks.Change = callback;
        if(context.callbacks.Change && typeof(context.callbacks.Change) === 'function') {
          context.callbacks.Change(context.instance, context.player);
        }
      }, 300);

      setTimeout( () => {
        context.setPlayerChangeLoad(true);
      }, 500);
    });

    // Determine if the next media information could be obtained.
    context.player.on('loadeddata',() => {
      context.setPlayerChangeLoad(true);
      context.player.off('loadeddata');
    });

  } else {
    if(isplay){
      context.play();
    }

    if(!context.callbacks.Change && callback) context.callbacks.Change = callback;
    if(context.callbacks.Change && typeof(context.callbacks.Change) === 'function') {
      context.callbacks.Change(context.instance, context.player);
    }

  }
}
