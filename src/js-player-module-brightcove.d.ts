export declare class PLAYER_MODULE_BRIGHTCOVE {
    VERSION: string;
    PlayerChangeLoadFlg: boolean;
    CONFIG: {
        mode: string;
        id: string;
        player_id: string;
        player_id_wrap: string;
        player_ui_id: string;
        player_style_id: string;
        videoid: string;
        account: string;
        width: string;
        height: string;
        player: string;
        volume: number;
        playsinline: string;
        loop: string;
        muted: string;
        ui_controls: string;
        ui_autoplay: string;
        ui_default: boolean;
        ui_default_css: boolean;
        stop_outfocus: boolean;
        poster: string;
        add_style: string;
        classname_active_wrap: string;
        classname_active: string;
    };
    on: {
        PlayerInit: any;
        PlayerEnded: any;
        PlayerPlay: any;
        PlayerPause: any;
        TimeUpdate: any;
        VolumeChange: any;
        PlayPrep: any;
        Play: any;
        Pause: any;
        Stop: any;
        PauseAll: any;
        StopAll: any;
        Change: any;
    };
    PlayerMediaInfo: {};
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
    constructor(options: any);
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
    Play(callback?: () => {}): void;
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
    Change(id: any, isplay?: boolean | null, callback?: () => {}): void;
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
    Destroy(): void;
    SetPoster(path?: string): void;
    private _setInfo;
    static parseNumber(num: number | string): string;
    static pad(n: number | string, width: number, z: string): string;
    static toFixedNumber(num: number | string, digits: number, base?: number): number;
}
