# js-player-module-brightcove

## 7.1.0

### Minor Changes

- 909b5bc: 再生開始時に再生中の他プレーヤーを一時停止する `pause_others_on_play` オプションを追加

## 7.0.1

### Patch Changes

- 978e3fa: Apply `player_ui_id` to the generated player UI wrapper.

## 7.0.0

### Major Changes

- 2baaaf9: Migrate the library build from webpack to Vite library mode and target ES2015, dropping IE11 support. Generated dist files are no longer tracked in Git and should be produced during release.

## 6.4.4

### Patch Changes

- 338c7dc: Add a small test foundation and fix volume/default UI style issues.
- 338c7dc: Extract player configuration defaults into typed helpers.
