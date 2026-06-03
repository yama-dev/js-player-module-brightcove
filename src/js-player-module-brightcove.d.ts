import { PlayerCallbacks, PlayerConfig, PlayerOptions } from './types';
export declare class PLAYER_MODULE_BRIGHTCOVE {
    VERSION: string;
    PlayerChangeLoadFlg: boolean;
    CONFIG: PlayerConfig;
    on: PlayerCallbacks;
    Player: any;
    $: {
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
    };
    playerHtml: string;
    playerUiHtml: string;
    playerCss: string;
    playerCssOption: string;
    playerScriptCode: string;
    PlayerJson: {};
    PlayerChangeSeekingFlg: boolean;
    state: {
        poster: string;
    };
    constructor(options: PlayerOptions);
    private BuildPlayer;
    PlayerInstance(): void;
    AddGlobalObject(): void;
    CacheElement(): void;
    EventPlay(): void;
    EventPause(): void;
    EventStop(): void;
    EventMute(): void;
    EventVolon(): void;
    EventVoloff(): void;
    /**
     * When dragging a seek bar(volume).
     */
    EventSeekbarVol(): void;
    /**
     * When dragging a seek bar(time).
     */
    EventSeekbarTime(): void;
    EventChangeVideo(): void;
    ClassOn(): void;
    ClassOff(): void;
    Update(): void;
    Play(forceplay?: boolean, callback?: () => {}): void;
    Stop(callback?: () => {}): void;
    Pause(callback?: () => {}): void;
    Mute(): void;
    /**
     * When Media change.
     *
     * id       | str      | media-id.
     * isplay   | boolean  | auto start after changed media.
     * callback | function | callback function after changed media.
     */
    Change(id: any, isplay?: boolean | null, callback?: () => {}): boolean;
    PauseAll(callback?: () => {}): void;
    StopAll(callback?: () => {}): void;
    SeekTo(sec: any): boolean;
    GetTime(): string;
    GetTimeDown(): string;
    GetTimeMax(): string;
    GetTimeRatio(): number;
    GetTimePar(): string;
    GetPoster(): any;
    GetMediaInfo(): any;
    SetVolume(vol?: number | 'off'): boolean;
    /**
     * video-tag set attribute 'title'.
     *
     * @param {string} title
     */
    SetVideoTitle(title: string): void;
    Destroy(): void;
    SetPoster(path?: string): void;
    private _setInfo;
    static parseNumber(num: number | string): string;
    static pad(n: number | string, width: number, z: string): string;
    static toFixedNumber(num: number | string, digits: number, base?: number): number;
}
