
declare module '@yama-dev/js-dom';

declare module '@yama-dev/js-parse-module/dist/js-parse-module';

declare function videojs(id: string): void;

declare const process: {
  env: {
    VERSION: string;
    DEBUG?: string | boolean;
  }
};

interface Window {
  PLAYER_MODULE_ALL_PLATLIST: any
}
