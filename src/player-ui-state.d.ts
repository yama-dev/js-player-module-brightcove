import { PlayerDomCache } from './dom-cache';
import { PlayerTimeInfo } from './player-time';
import { PlayerCallbacks, PlayerConfig } from './types';
export declare function activatePlayerUi(cache: PlayerDomCache, config: PlayerConfig, DOM: any): void;
export declare function deactivatePlayerUi(cache: PlayerDomCache, config: PlayerConfig, DOM: any): void;
export declare function renderPlayingTime(cache: PlayerDomCache, timeInfo: PlayerTimeInfo, callbacks: PlayerCallbacks, DOM: any): void;
export declare function renderEmptyTime(cache: PlayerDomCache, DOM: any): void;
