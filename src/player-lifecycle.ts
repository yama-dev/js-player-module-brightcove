import { PlayerDomCache } from './dom-cache';
import { toFixedNumber } from './number';
import { PlayerCallbacks, PlayerConfig } from './types';

export interface PlayerLifecycleContext {
  instance: any;
  player: any;
  config: PlayerConfig;
  callbacks: PlayerCallbacks;
  getCache(): PlayerDomCache;
  setVolume(volume: number): void;
  setInfo(): void;
  setPoster(): void;
  update(): void;
  stop(): void;
  classOn(): void;
  classOff(): void;
}

export function registerPlayerLifecycle(context: PlayerLifecycleContext, DOM: any): void {
  let loadedDataFlg = false;

  const handleLoaded = () => {
    if (loadedDataFlg) return;
    loadedDataFlg = true;

    context.setVolume(context.config.volume);
    context.setInfo();
    context.setPoster();
    context.update();

    const cache = context.getCache();
    if(cache.playerElem) DOM.addClass(cache.playerElem, context.config.classname_loaded_wrap);

    if (context.callbacks.PlayerInit && typeof context.callbacks.PlayerInit === 'function') {
      context.callbacks.PlayerInit(context.instance, context.player);
    }
  };

  context.player.on('loadedmetadata', handleLoaded);
  context.player.on('loadeddata', handleLoaded);

  // For Timeupdate.
  context.player.on('timeupdate', ()=>{
    context.update();
  });

  // For Volume change.
  context.player.on('volumechange', ()=>{
    // update(%)
    let volume = context.player.volume(); // volumeは0~1の範囲
    const cache = context.getCache();

    DOM.setStyle( cache.uiSeekbarVolCover, { width : (volume * 100) + '%' } );

    if (context.callbacks.VolumeChange && typeof context.callbacks.VolumeChange === 'function') {
      context.callbacks.VolumeChange({
        // volume: 0~1, par: 0~100
        volume: toFixedNumber(volume, 3),
        par   : toFixedNumber(volume * 100, 1)
      });
    }
  });

  // For Ended movie paly.
  context.player.on('ended', ()=>{
    context.stop();
    if(context.callbacks.PlayerEnded && typeof(context.callbacks.PlayerEnded) === 'function') {
      context.callbacks.PlayerEnded(context.instance, context.player);
    }
  });

  context.player.on('play', ()=>{
    context.classOn();
    if(context.callbacks.PlayerPlay && typeof(context.callbacks.PlayerPlay) === 'function') {
      context.callbacks.PlayerPlay(context.instance, context.player);
    }
  });

  context.player.on('pause', ()=>{
    context.classOff();
    if(context.callbacks.PlayerPause && typeof(context.callbacks.PlayerPause) === 'function') {
      context.callbacks.PlayerPause(context.instance, context.player);
    }
  });

  // For Error
  context.player.on( 'error' , (err: any)=>{
    console.log(err);
  });
}
