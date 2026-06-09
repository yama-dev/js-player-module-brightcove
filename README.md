# js-player-module-brightcove

Brightcove Player API を使ったカスタムプレーヤー用 JavaScript ライブラリです。

## Features

- Brightcove Player の埋め込みタグとプレーヤースクリプトを生成
- 標準 UI の表示、非表示を切り替え可能
- 動画、音声モードを切り替え可能
- 再生、停止、一時停止、ミュート、シーク、音量変更、動画差し替え API を提供
- 再生状態、時間更新、音量変更、動画変更などの callback を提供

## Requirements

- Brightcove account id
- Brightcove video id
- Browser target: ES2015+

v7 以降は IE11 をサポートしません。ビルドは Vite library mode で行います。

## Installation

```bash
npm install js-player-module-brightcove
```

```js
import PLAYER_MODULE_BRIGHTCOVE from 'js-player-module-brightcove';
```

Standalone で使う場合は npm package に含まれる `dist/js-player-module-brightcove.js` を読み込んでください。

```html
<script src="https://cdn.jsdelivr.net/npm/js-player-module-brightcove@latest/dist/js-player-module-brightcove.js"></script>
```

## Basic Usage

```html
<div id="brightcovePlayer"></div>

<script>
  const player = new PLAYER_MODULE_BRIGHTCOVE({
    id: 'brightcovePlayer',
    videoid: '4230322585001',
    account: '20318290001'
  });
</script>
```

Brightcove Player script は `account` と `player` option から次の形式で読み込まれます。

```text
//players.brightcove.net/{account}/{player}_default/index.min.js
```

`player` を指定しない場合は `default` が使われます。

## Usage Examples

### Audio Mode

```js
new PLAYER_MODULE_BRIGHTCOVE({
  mode: 'audio',
  id: 'audioPlayer',
  videoid: '4230322585001',
  account: '20318290001'
});
```

### Custom UI

`ui_default: false` を指定すると、ライブラリが出力する標準 UI を使わずに独自 UI を実装できます。

```html
<div id="customPlayer">
  <button type="button" onclick="player.Play()">Play</button>
  <button type="button" onclick="player.Pause()">Pause</button>
  <button type="button" onclick="player.Stop()">Stop</button>
</div>

<script>
  const player = new PLAYER_MODULE_BRIGHTCOVE({
    id: 'customPlayer',
    videoid: '4230322585001',
    account: '20318290001',
    ui_default: false
  });
</script>
```

### Callbacks

```js
const player = new PLAYER_MODULE_BRIGHTCOVE({
  id: 'brightcovePlayer',
  videoid: '4230322585001',
  account: '20318290001',
  on: {
    PlayerInit(instance, brightcovePlayer) {
      console.log(instance.GetMediaInfo());
    },
    TimeUpdate(time) {
      console.log(time.current, time.max, time.par);
    },
    VolumeChange(volume) {
      console.log(volume.volume, volume.par);
    },
    Change(instance) {
      console.log(instance.GetPoster());
    }
  }
});
```

## Options

| Option                  | Type      | Default              | Description                                 |
| :---                    | :---      | :---                 | :---                                        |
| `id`                    | `string`  | `pmb`                | プレーヤーを出力する wrapper 要素の id。    |
| `videoid`               | `string`  | `4929511769001`      | 初期表示する Brightcove video id。          |
| `account`               | `string`  | `''`                 | Brightcove account id。                     |
| `player`                | `string`  | `default`            | Brightcove player id。                      |
| `mode`                  | `string`  | `movie`              | `movie` または `audio`。                    |
| `width`                 | `string`  | `''`                 | video 要素の width。                        |
| `height`                | `string`  | `''`                 | video 要素の height。                       |
| `video_title`           | `string`  | `''`                 | video 要素の title 属性。                   |
| `volume`                | `number`  | `1`                  | 初期音量。`0` から `1` の範囲。             |
| `playsinline`           | `boolean` | `true`               | inline 再生属性を付与するか。               |
| `loop`                  | `boolean` | `false`              | loop 属性を付与するか。                     |
| `muted`                 | `boolean` | `false`              | muted 属性を付与するか。                    |
| `ui_controls`           | `boolean` | `false`              | Brightcove 標準 controls 属性を付与するか。 |
| `ui_autoplay`           | `boolean` | `false`              | autoplay 属性を付与するか。                 |
| `ui_default`            | `boolean` | `true`               | ライブラリ標準 UI を出力するか。            |
| `ui_default_css`        | `boolean` | `true`               | ライブラリ標準 CSS を出力するか。           |
| `pause_others_on_play`  | `boolean` | `false`              | 再生開始時に再生中の他プレーヤーを一時停止するか。 |
| `stop_outfocus`         | `boolean` | `false`              | window blur 時に停止するか。                |
| `poster`                | `string`  | `''`                 | poster 画像 URL。                           |
| `add_style`             | `string`  | `''`                 | 追加 CSS。                                  |
| `classname_loaded_wrap` | `string`  | `is-pmb-loaded-wrap` | 読み込み完了時に wrapper へ付与する class。 |
| `classname_active_wrap` | `string`  | `is-pmb-active-wrap` | 再生中に wrapper へ付与する class。         |
| `classname_active`      | `string`  | `is-pmb-active`      | active 状態の UI に付与する class。         |
| `on`                    | `object`  | `{}`                 | callback 設定。                             |

## Callbacks

| Callback       | Payload                              | Timing                             |
| :---           | :---                                 | :---                               |
| `PlayerInit`   | `(instance, brightcovePlayer)`       | Brightcove player 初期化後。       |
| `PlayerEnded`  | `(instance, brightcovePlayer)`       | 再生終了時。                       |
| `PlayerPlay`   | `(instance, brightcovePlayer)`       | Brightcove player の play event。  |
| `PlayerPause`  | `(instance, brightcovePlayer)`       | Brightcove player の pause event。 |
| `TimeUpdate`   | `{ current, max, down, ratio, par }` | timeupdate 時。                    |
| `VolumeChange` | `{ volume, par }`                    | volumechange 時。                  |
| `PlaybackRateChange` | `rate`                          | ratechange 時。                    |
| `PlayPrep`     | `(instance, brightcovePlayer)`       | `Play()` 実行直前。                |
| `Play`         | `(instance, brightcovePlayer)`       | `Play()` 実行後。                  |
| `Pause`        | `(instance, brightcovePlayer)`       | `Pause()` 実行後。                 |
| `Stop`         | `(instance, brightcovePlayer)`       | `Stop()` 実行後。                  |
| `PauseAll`     | `(instance, brightcovePlayer)`       | `PauseAll()` 実行後。              |
| `StopAll`      | `(instance, brightcovePlayer)`       | `StopAll()` 実行後。               |
| `Change`       | `(instance, brightcovePlayer)`       | `Change()` による動画変更後。      |

## Methods

| Method                                | Description                                         |
| :---                                  | :---                                                |
| `Play(forceplay?, callback?)`         | 再生します。再生中の場合は一時停止します。          |
| `Stop(callback?)`                     | 一時停止して再生位置を `0` に戻します。             |
| `Pause(callback?)`                    | 一時停止します。                                    |
| `Mute()`                              | mute 状態を切り替えます。                           |
| `Change(videoid, isplay?, callback?)` | 動画を差し替えます。                                |
| `PauseAll(callback?)`                 | 登録済みの全プレーヤーを一時停止します。            |
| `StopAll(callback?)`                  | 登録済みの全プレーヤーを停止します。                |
| `SeekTo(sec)`                         | 指定秒数へシークします。                            |
| `SeekBy(sec)`                         | 現在位置から指定秒数だけ前後へシークします。        |
| `GetPlaybackRate()`                   | 現在の再生速度を返します。                          |
| `SetPlaybackRate(rate)`               | 再生速度を `0.5` から `2` の範囲で設定します。      |
| `GetTime()`                           | 現在時間を `mm:ss` 形式で返します。                 |
| `GetTimeDown()`                       | 残り時間を `mm:ss` 形式で返します。                 |
| `GetTimeMax()`                        | 動画時間を `mm:ss` 形式で返します。                 |
| `GetTimeRatio()`                      | 現在位置を `0` から `1` の比率で返します。          |
| `GetTimePar()`                        | 現在位置を `%` 文字列で返します。                   |
| `GetPoster()`                         | 現在の poster を返します。                          |
| `GetMediaInfo()`                      | Brightcove の media info を返します。               |
| `SetVolume(volume)`                   | 音量を設定します。`0` から `1` の範囲を指定します。 |
| `SetVideoTitle(title)`                | video 要素の title 属性を更新します。               |
| `SetPoster(path?)`                    | poster を更新し、UI に反映します。                  |
| `Destroy()`                           | Brightcove player を reset します。                 |

## Links

- [npm](https://www.npmjs.com/package/js-player-module-brightcove)
- [Demo](https://yama-dev.github.io/js-player-module-brightcove/examples/)
- [Brightcove Player API](https://docs.brightcove.com/brightcove-player/current-release/Player.html)
- [GitHub Releases](https://github.com/yama-dev/js-player-module-brightcove/releases/latest)

## License

MIT
