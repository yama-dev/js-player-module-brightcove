# PLAYER MODULE BRIGHTCOVE

<br>

## Feature

Brightcove Player API を使用した BrightcoveカスタムPlayerです。  
公式ドキュメントはこちら。https://brightcovelearning.github.io/Brightcove-API-References/

<br>

## Installation

- npm -> coming soon...

- Standalone -> [link](https://raw.githubusercontent.com/yama-dev/js-player-module-brightcove/master/dist/js-player-module-brightcove.min.js)

<br>

## DownLoad

ダウンロードURL [yama-dev/js-player-module-brightcove](https://github.com/yama-dev/js-player-module-brightcove/releases/latest)

<br>

## Using

### Basic Standalone Usage

``` html
<script src="./js-player-module-brightcove.js"></script>
<div id="brightcovePlayer1">
  <script>
    new PLAYER_MODULE_BRIGHTCOVE({
      id:'brightcovePlayer1',
      videoid:'4217352666001',
      account:'20318290001',
    });
  </script>
</div>
```

<br>

## Sample Code

### ①BASIC Player

<img src="https://raw.githubusercontent.com/yama-dev/assets/master/images/js-player-module-brightcove/brightcovePlayer1.png" style="width: 100%; max-width: 520px; border: 1px solid #eee;" alt="">

``` html
<div id="brightcovePlayer1">
  <script>
    new PLAYER_MODULE_BRIGHTCOVE({
      id:'brightcovePlayer1',
      videoid:'4217352666001',
      account:'20318290001'
    });
  </script>
</div>
```

### ②AUDIO Player

``` html
<div id="brightcovePlayerAudio">
  <script>
    new PLAYER_MODULE_BRIGHTCOVE({
      mode: 'audio',
      id:'brightcovePlayerAudio',
      videoid:'4217352666001',
      account:'20318290001'
    });
  </script>
</div>
```

<br>

## API

### Default

| Parameter | Type   | Default      | Description                                | 
| ---       | ---    | ---          | ---                                        | 
| id        | string | - ※省略不可 | プレーヤーを出力する要素のidを設定します。 | 
| videoid   | string | - ※省略不可 | 動画のvideoidを設定します。                | 
| account   | string | - ※省略不可 | BrightcovePlayerのaccountを設定します。    | 

### Options

| Parameter      | Type    | Default | Description                                                                                                                                       | 
| ---            | ---     | ---     | ---                                                                                                                                               | 
| ui_controls    | boolean | false   | `control`を表示するかしないかを指定します。<br>デフォルトでは、表示されません。                                                                   | 
| ui_default     | boolean | true    | ライブラリであらかじめ用意したUIパーツを表示するかしないかを指定します。<br>デフォルトは、表示されます。<br>※`false`を指定すると出力されません。 | 
| ui_default_css | boolean | true    | ライブラリであらかじめ用意したCSSを出力するかしないかを指定します。<br>デフォルトは、CSSを出力します。<br>※`false`を指定すると出力されません。   | 
| ui_autoplay    | boolean | false   | 自動再生をするか指定します。<br>デフォルトでは、自動再生はされません。<br>※`true`を設定すると、動画のロードが完了すると自動再生を開始します。    | 
| mode           | string  | 'movie' | `'movie'` -> 動画モード<br>`'audio` -> 音声モード<br><br>デフォルトでは、動画モードになります。<br>動画か音声のみかを簡単に切り替えが出来ます。<br>※`'audio'`を設定すると、動画が表示されません。 | 
| poster         | string  | null    | 動画のポスター画像を設定できます。<br>画像のパスを設定することで、サムネイルとして読み込まれます。 | 

<br>


## Browser support

| Browser           | OS、version | 
| ---               | ---         | 
| Internet Explorer | 11+         | 
| Chrome            | 最新        | 
| Firefox           | 最新        | 
| Safari            | 最新        | 
| Android           | 4.4+ Chrome | 
| iOS               | 8.0+ safari | 

[Useble Browser version LIST -> Check More](./docs/device-check.md)

<br>

## Dependencies

none

<br><br><br>

___

**For Developer**

## Contribution

1. Fork it ( https://github.com/yama-dev/js-player-module-brightcove/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

<br>

## Develop

### at Development

Install node modules.

``` bash
$ npm install
```

Run npm script 'develop'

``` bash
$ npm run develop
```

### at Production

Run npm script 'production'

``` bash
$ npm run production
```

<br>

## Licence

[MIT](https://github.com/yama-dev/js-player-module-brightcove/blob/master/LICENSE)

<br>

## Author

[yama-dev](https://github.com/yama-dev)

