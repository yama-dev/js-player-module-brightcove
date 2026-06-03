export interface PlayerTimeSource {
    currentTime(): number;
    duration(): number;
}
export interface PlayerTimeInfo {
    current: string;
    max: string;
    down: string;
    ratio: number;
    par: string;
}
export declare function getPlayerTime(player: PlayerTimeSource): string;
export declare function getPlayerTimeDown(player: PlayerTimeSource): string;
export declare function getPlayerTimeMax(player: PlayerTimeSource): string;
export declare function getPlayerTimeRatio(player: PlayerTimeSource): number;
export declare function getPlayerTimePar(player: PlayerTimeSource): string;
export declare function getPlayerTimeInfo(player: PlayerTimeSource): PlayerTimeInfo;
