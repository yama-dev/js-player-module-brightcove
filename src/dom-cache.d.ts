import { PlayerConfig } from './types';
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
export declare function createEmptyDomCache(): PlayerDomCache;
export declare function selectPlayerDomCache(DOM: any, config: PlayerConfig): PlayerDomCache;
