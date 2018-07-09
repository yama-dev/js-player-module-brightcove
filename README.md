# PLAYER MODULE BRIGHTCOVE

<br>

## Feature

Brightcove custom player using the Brightcove Player API.  
The official document is here. -> https://brightcovelearning.github.io/Brightcove-API-References/

<br>

## Demo

- Samples -> [https://yama-dev.github.io/js-player-module-brightcove/sample/](https://yama-dev.github.io/js-player-module-brightcove/sample/)

<br>

## Installation,Download

- npm -> [https://www.npmjs.com/package/js-player-module-brightcove](https://www.npmjs.com/package/js-player-module-brightcove)

- Standalone(CDN) -> [https://cdn.rawgit.com/yama-dev/js-player-module-brightcove/743ab7e5/dist/js-player-module-brightcove.js](https://cdn.rawgit.com/yama-dev/js-player-module-brightcove/743ab7e5/dist/js-player-module-brightcove.js)

- Zip -> [yama-dev/js-player-module-brightcove](https://github.com/yama-dev/js-player-module-brightcove/releases/latest)

<br>

## Using

### NPM Usage

``` bash
# install npm.
npm install --save-dev js-player-module-brightcove
```

``` javascript.
// import.
import PLAYER_MODULE_BRIGHTCOVE from 'js-player-module-brightcove';
```

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

<img src="https://raw.githubusercontent.com/yama-dev/assets/master/images/js-player-module-brightcove/sample_player1.png" style="width: 100%; max-width: 520px; border: 1px solid #eee;" alt="">

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

### ②Original image Player

<img src="https://raw.githubusercontent.com/yama-dev/assets/master/images/js-player-module-brightcove/sample_player_original-image.png" style="width: 100%; max-width: 520px; border: 1px solid #eee;" alt="">

``` html
<div id="brightcovePlayerOriginalimage">
  <script>
    new PLAYER_MODULE_BRIGHTCOVE({
      id: 'brightcovePlayerOriginalimage',
      videoid: '4217352666001',
      account: '20318290001',
      ui_default: false
    });
  </script>
  <div class="player__btn">
    <div class="btn_play"><img class="on" src="http://placehold.jp/14/333/ddd/120x30.png?text=PLAY" alt=""><img class="off" src="http://placehold.jp/14/ddd/333/120x30.png?text=PLAY" alt=""></div>
    <div class="btn_pause"><img class="on" src="http://placehold.jp/14/333/ddd/120x30.png?text=PAUSE" alt=""><img class="off" src="http://placehold.jp/14/ddd/333/120x30.png?text=PAUSE" alt=""></div>
    <div class="btn_stop"><img class="on" src="http://placehold.jp/14/333/ddd/120x30.png?text=STOP" alt=""><img class="off" src="http://placehold.jp/14/ddd/333/120x30.png?text=STOP" alt=""></div>
    <div class="btn_mute"><img class="on" src="http://placehold.jp/14/333/ddd/120x30.png?text=MUTE" alt=""><img class="off" src="http://placehold.jp/14/ddd/333/120x30.png?text=MUTE" alt=""></div>
  </div>
</div>
```

### ③AUDIO Player

<img src="https://raw.githubusercontent.com/yama-dev/assets/master/images/js-player-module-brightcove/sample_audio.png" style="width: 100%; max-width: 520px; border: 1px solid #eee;" alt="">

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
| :---      | :---:  | :---:        | :---                                       | 
| id        | string | - ※省略不可 | プレーヤーを出力する要素のidを設定します。 | 
| videoid   | string | - ※省略不可 | 動画のvideoidを設定します。                | 
| account   | string | - ※省略不可 | BrightcovePlayerのaccountを設定します。    | 

### Options

| Parameter      | Type    | Default | Description                                                                                                                                                                                        | 
| :---           | :---:   | :---:   | :---                                                                                                                                                                                               | 
| playsinline    | boolean | true    | iOS10+でインライン再生をするかを指定します。<br>デフォルトでは、`playsinline`属性が設定され、インライン再生されます。<br>※`false`を指定するとiOS10+では全画面にプレーヤーが立ち上がります。       | 
| volume         | number  | 1       | 初期の音量を指定します。(0.0～1.0)<br>デフォルトでは、1(最大音量)がセットされます。<br>※機種、ブラウザに依存します。                                                                              | 
| ui_controls    | boolean | false   | `control`を表示するかしないかを指定します。<br>デフォルトでは、表示されません。                                                                                                                    | 
| ui_default     | boolean | true    | ライブラリであらかじめ用意したUIパーツを表示するかしないかを指定します。<br>デフォルトは、表示されます。<br>※`false`を指定すると出力されません。                                                  | 
| ui_default_css | boolean | true    | ライブラリであらかじめ用意したCSSを出力するかしないかを指定します。<br>デフォルトは、CSSを出力します。<br>※`false`を指定すると出力されません。                                                    | 
| ui_autoplay    | boolean | false   | 自動再生をするか指定します。<br>デフォルトでは、自動再生はされません。<br>※`true`を設定すると、動画のロードが完了すると自動再生を開始します。                                                     | 
| mode           | string  | 'movie' | `'movie'` -> 動画モード<br>`'audio` -> 音声モード<br><br>デフォルトでは、動画モードになります。<br>動画か音声のみかを簡単に切り替えが出来ます。<br>※`'audio'`を設定すると、動画が表示されません。 | 
| poster         | string  | null    | 動画のポスター画像を設定できます。<br>画像のパスを設定することで、サムネイルとして読み込まれます。                                                                                                 | 

<br>


## Browser support

| Browser           | OS、version | 
| :---              | :---        | 
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

