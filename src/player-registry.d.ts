import { PlayerConfig } from './types';
export interface PlayerRegistryItem {
    instance: any;
    Player: any;
    videoid: string;
    id: string;
    player_id: string;
}
export declare function addGlobalPlayer(instance: any, player: any, config: PlayerConfig): void;
export declare function pauseAllPlayers(): void;
export declare function stopAllPlayers(): void;
