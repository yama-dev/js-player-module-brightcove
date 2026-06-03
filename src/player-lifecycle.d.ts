import { PlayerDomCache } from './dom-cache';
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
export declare function registerPlayerLifecycle(context: PlayerLifecycleContext, DOM: any): void;
