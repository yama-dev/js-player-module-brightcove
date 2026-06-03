import { PlayerDomCache } from './dom-cache';
import { PlayerConfig } from './types';
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
export declare function bindEventPlay(context: PlayerEventContext, DOM: any): void;
export declare function bindEventPause(context: PlayerEventContext, DOM: any): void;
export declare function bindEventStop(context: PlayerEventContext, DOM: any): void;
export declare function bindEventMute(context: PlayerEventContext, DOM: any): void;
export declare function bindEventVolon(context: PlayerEventContext, DOM: any): void;
export declare function bindEventVoloff(context: PlayerEventContext, DOM: any): void;
/**
 * When dragging a seek bar(volume).
 */
export declare function bindEventSeekbarVol(context: PlayerEventContext, DOM: any): void;
/**
 * When dragging a seek bar(time).
 */
export declare function bindEventSeekbarTime(context: PlayerEventContext, DOM: any): void;
export declare function bindEventChangeVideo(context: PlayerEventContext, DOM: any): void;
