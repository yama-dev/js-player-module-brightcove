
declare function test(): string;

interface MyInterface{
  name: string
  init(): any 
}

interface PlayerModuleBrightcoveInterface {
  VERSION: any
  PlayerChangeLoadFlg: boolean
  CONFIG: {
    mode: string
    id  : string

    player_id: string
    player_id_wrap: string
    player_ui_id: string
    player_style_id: string

    videoid: string | number
    account: string | number
    width: string | number
    height: string | number

    player: string | number
    volume: number

    playsinline: string
    loop: string
    muted: string // '' | 'muted'

    ui_controls: string
    ui_autoplay: string
    ui_default: boolean
    ui_default_css: boolean

    stop_outfocus: boolean
    poster: boolean

    add_style: string
    classname_active_wrap: string
    classname_active: string
  }
  PlayerMediaInfo: any
  Player: any
  $: {
    playerElem                 : any
    playerElemMain             : any
    playerElemMainWrap         : any
    uiBtnPlay                  : any
    uiBtnStop                  : any
    uiBtnPause                 : any
    uiBtnMute                  : any
    uiBtnVolon                 : any
    uiBtnVoloff                : any
    uiDisplayTime              : any
    uiDisplayTimeNow           : any
    uiDisplayTimeTotal         : any
    uiDisplayTimeDown          : any
    uiDisplayTimePar           : any
    uiDisplayPoster            : any
    uiDisplayPosterBg          : any
    uiDisplayName              : any
    uiSeekbarVol               : any
    uiSeekbarVolBg             : any
    uiSeekbarVolCover          : any
    uiSeekbarTime              : any
    uiSeekbarTimeBg            : any
    uiSeekbarTimeCover         : any
    uiBtnChange                : any
    uiBtnDataId                : any
  }
  playerHtml: any
  playerCss: any
  playerScriptCode: any
  playerUiHtml: string
  playerCssOption: string
  on: any
  PlayerJson?: any
  PlayerChangeSeekingFlg: boolean

  state: {
    poster: string
  }
}

declare function videojs(id: string): void

interface Window {
  PLAYER_MODULE_ALL_PLATLIST: any
}

