import { PlayerDomCache } from './dom-cache';
import { PlayerCallbacks, PlayerConfig } from './types';
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
export declare function changePlayerMedia(context: PlayerChangeContext, DOM: any, id: any, isplay?: boolean | null, callback?: () => {}): boolean | void;
