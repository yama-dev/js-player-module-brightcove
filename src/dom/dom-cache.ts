import { PlayerConfig } from '../types';

export interface PlayerDomCache {
  playerElem: any[];
  playerElemMainWrap: any[];
  uiBtnPlay: any[];
  uiBtnStop: any[];
  uiBtnPause: any[];
  uiBtnMute: any[];
  uiBtnVolon: any[];
  uiBtnVoloff: any[];
  uiDisplayTime: any[];
  uiDisplayTimeNow: any[];
  uiDisplayTimeTotal: any[];
  uiDisplayTimeDown: any[];
  uiDisplayTimePar: any[];
  uiDisplayPoster: any[];
  uiDisplayPosterBg: any[];
  uiDisplayName: any[];
  uiSeekbarVol: any[];
  uiSeekbarVolBg: any[];
  uiSeekbarVolCover: any[];
  uiSeekbarTime: any[];
  uiSeekbarTimeBg: any[];
  uiSeekbarTimeCover: any[];
  uiBtnChange: any[];
  uiBtnDataId: any[];
}

export function createEmptyDomCache(): PlayerDomCache {
  return {
    playerElem                 : [],
    playerElemMainWrap         : [],
    uiBtnPlay                  : [],
    uiBtnStop                  : [],
    uiBtnPause                 : [],
    uiBtnMute                  : [],
    uiBtnVolon                 : [],
    uiBtnVoloff                : [],
    uiDisplayTime              : [],
    uiDisplayTimeNow           : [],
    uiDisplayTimeTotal         : [],
    uiDisplayTimeDown          : [],
    uiDisplayTimePar           : [],
    uiDisplayPoster            : [],
    uiDisplayPosterBg          : [],
    uiDisplayName              : [],
    uiSeekbarVol               : [],
    uiSeekbarVolBg             : [],
    uiSeekbarVolCover          : [],
    uiSeekbarTime              : [],
    uiSeekbarTimeBg            : [],
    uiSeekbarTimeCover         : [],
    uiBtnChange                : [],
    uiBtnDataId                : [],
  };
}

export function selectPlayerDomCache(DOM: any, config: PlayerConfig): PlayerDomCache {
  const rootSelector = `#${config.id}`;

  return {
    playerElem                 : DOM.selectDom(rootSelector),
    playerElemMainWrap         : DOM.selectDom(`${rootSelector} #${config.player_id_wrap}`),

    uiBtnPlay                  : DOM.selectDom(`${rootSelector} .ui-btn-play`),
    uiBtnStop                  : DOM.selectDom(`${rootSelector} .ui-btn-stop`),
    uiBtnPause                 : DOM.selectDom(`${rootSelector} .ui-btn-pause`),
    uiBtnMute                  : DOM.selectDom(`${rootSelector} .ui-btn-mute`),
    uiBtnVolon                 : DOM.selectDom(`${rootSelector} .ui-btn-volon`),
    uiBtnVoloff                : DOM.selectDom(`${rootSelector} .ui-btn-voloff`),

    uiDisplayTime              : DOM.selectDom(`${rootSelector} .ui-time`),
    uiDisplayTimeNow           : DOM.selectDom(`${rootSelector} .ui-time-now`),
    uiDisplayTimeTotal         : DOM.selectDom(`${rootSelector} .ui-time-total`),
    uiDisplayTimeDown          : DOM.selectDom(`${rootSelector} .ui-time-down`),
    uiDisplayTimePar           : DOM.selectDom(`${rootSelector} .ui-time-par`),
    uiDisplayPoster            : DOM.selectDom(`${rootSelector} .ui-poster`),
    uiDisplayPosterBg          : DOM.selectDom(`${rootSelector} .ui-poster-background`),
    uiDisplayName              : DOM.selectDom(`${rootSelector} .ui-name`),

    uiSeekbarVol               : DOM.selectDom(`${rootSelector} .ui-seekbar-vol`),
    uiSeekbarVolBg             : DOM.selectDom(`${rootSelector} .ui-seekbar-vol .ui-seekbar-vol-bg`),
    uiSeekbarVolCover          : DOM.selectDom(`${rootSelector} .ui-seekbar-vol span`),
    uiSeekbarTime              : DOM.selectDom(`${rootSelector} .ui-seekbar-time`),
    uiSeekbarTimeBg            : DOM.selectDom(`${rootSelector} .ui-seekbar-time .ui-seekbar-time-bg`),
    uiSeekbarTimeCover         : DOM.selectDom(`${rootSelector} .ui-seekbar-time span`),

    uiBtnChange                : DOM.selectDom(`${rootSelector} .ui-btn-change`),

    uiBtnDataId                : DOM.selectDom('[data-pmb-id]'),
  };
}
