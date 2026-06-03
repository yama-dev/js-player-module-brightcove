import { PlayerDomCache } from './dom-cache';
import { PlayerCallbacks, PlayerConfig } from './types';
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
export declare function playPlayer(context: PlayerControlContext, forceplay?: boolean, callback?: () => {}): void;
export declare function stopPlayer(context: PlayerControlContext, callback?: () => {}): void;
export declare function pausePlayer(context: PlayerControlContext, callback?: () => {}): void;
export declare function mutePlayer(context: PlayerControlContext, DOM: any): void;
export declare function seekPlayerTo(player: any, sec: any): boolean | void;
export declare function setPlayerVolume(player: any, config: PlayerConfig, vol?: number | 'off'): boolean | void;
