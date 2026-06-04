import { PlayerDomCache } from '../dom/dom-cache';
import { PlayerTimeInfo } from './player-time';
import { PlayerCallbacks, PlayerConfig } from '../types';

export function activatePlayerUi(cache: PlayerDomCache, config: PlayerConfig, DOM: any): void {
  // Add className Player wrapper.
  if(cache.playerElem) DOM.addClass(cache.playerElem, config.classname_active_wrap);

  // Add className Play-Button.
  if(cache.uiBtnPlay) DOM.addClass(cache.uiBtnPlay, config.classname_active);

  // Add className Pause-Button.
  if(cache.uiBtnPause) DOM.addClass(cache.uiBtnPause, config.classname_active);

  // Add className MediaChange-Button.
  if(cache.uiBtnDataId){
    cache.uiBtnDataId.map((item)=>{
      if(config.videoid == item.getAttribute('data-pmb-id')){
        DOM.addClass(item, config.classname_active);
      }
    });
  }
}

export function deactivatePlayerUi(cache: PlayerDomCache, config: PlayerConfig, DOM: any): void {
  // Remove className Player wrapper.
  if(cache.playerElem) DOM.removeClass(cache.playerElem, config.classname_active_wrap);

  // Remove className Play-Button.
  if(cache.uiBtnPlay) DOM.removeClass(cache.uiBtnPlay, config.classname_active);

  // Remove className Pause-Button.
  if(cache.uiBtnPause) DOM.removeClass(cache.uiBtnPause, config.classname_active);

  // Remove className MediaChange-Button.
  if(cache.uiBtnDataId) DOM.removeClass(cache.uiBtnDataId, config.classname_active);
}

export function renderPlayingTime(cache: PlayerDomCache, timeInfo: PlayerTimeInfo, callbacks: PlayerCallbacks, DOM: any): void {
  // update player data. (ms)
  if(cache.uiDisplayTime) DOM.setHtml( cache.uiDisplayTime, timeInfo.current+'/'+timeInfo.max );
  if(cache.uiDisplayTimeNow) DOM.setHtml( cache.uiDisplayTimeNow, timeInfo.current );
  if(cache.uiDisplayTimeDown) DOM.setHtml( cache.uiDisplayTimeDown, timeInfo.down );
  if(cache.uiDisplayTimeTotal) DOM.setHtml( cache.uiDisplayTimeTotal, timeInfo.max );

  // update play time. (%)
  if(cache.uiDisplayTimePar) DOM.setHtml( cache.uiDisplayTimePar, timeInfo.par );

  // update seek-bar. (%)
  if(cache.uiSeekbarTimeCover) cache.uiSeekbarTimeCover[0].style.width = timeInfo.par;

  if(callbacks.TimeUpdate && typeof(callbacks.TimeUpdate) === 'function'){
    callbacks.TimeUpdate(timeInfo);
  }
}

export function renderEmptyTime(cache: PlayerDomCache, DOM: any): void {
  // update player data. (ms)
  if(cache.uiDisplayTime) DOM.setHtml( cache.uiDisplayTime, '00:00/00:00' );
  if(cache.uiDisplayTimeNow) DOM.setHtml( cache.uiDisplayTimeNow, '00:00' );
  if(cache.uiDisplayTimeDown) DOM.setHtml( cache.uiDisplayTimeDown, '00:00' );
  if(cache.uiDisplayTimeTotal) DOM.setHtml( cache.uiDisplayTimeTotal, '00:00' );

  // update play time. (%)
  if(cache.uiDisplayTimePar) DOM.setHtml( cache.uiDisplayTimePar, '0%' );

  // update seek-bar. (%)
  if(cache.uiSeekbarTimeCover) cache.uiSeekbarTimeCover[0].style.width = '0%';
}
