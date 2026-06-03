import { PlayerDomCache } from './dom-cache';
import { PlayerConfig } from './types';
export interface PlayerMarkup {
    playerHtml: string;
    playerUiHtml: string;
    playerCss: string;
    playerCssOption: string;
    playerScriptCode: string;
}
export declare function createPlayerMarkup(config: PlayerConfig): PlayerMarkup;
export declare function mountPlayerElements(config: PlayerConfig, cache: PlayerDomCache, markup: PlayerMarkup, DOM: any, onScriptLoad: () => void): void;
