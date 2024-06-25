# PLAYER MODULE BRIGHTCOVE

<br>

## Feature

Brightcove custom player using the Brightcove Player API.
The official document is here. -> https://docs.brightcove.com/brightcove-player/current-release/Player.html

<br>

## Demo

- [https://yama-dev.github.io/js-player-module-brightcove/examples/](https://yama-dev.github.io/js-player-module-brightcove/examples/)

<br>

## Installation,Download

- npm -> [https://www.npmjs.com/package/js-player-module-brightcove](https://www.npmjs.com/package/js-player-module-brightcove)

- Standalone(CDN) -> [https://cdn.jsdelivr.net/gh/yama-dev/js-player-module-brightcove@v6.4.3/dist/js-player-module-brightcove.js](https://cdn.jsdelivr.net/gh/yama-dev/js-player-module-brightcove@v6.4.3/dist/js-player-module-brightcove.js)

- Zip -> [yama-dev/js-player-module-brightcove](https://github.com/yama-dev/js-player-module-brightcove/releases/latest)

<br>

## Using

### NPM Usage

``` bash
# install npm.
npm install --save js-player-module-brightcove
```

``` javascript
// import.
import PLAYER_MODULE_BRIGHTCOVE from 'js-player-module-brightcove';
```

### Basic Standalone Usage

``` html
<script src="./js-player-module-brightcove.js"></script>
<div id="brightcovePlayer1">
  <script>
    new PLAYER_MODULE_BRIGHTCOVE({
      id: 'brightcovePlayer1',
      videoid: '4230322585001',
      account: '20318290001'
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
      id: 'brightcovePlayer1',
      videoid: '4230322585001',
      account: '20318290001'
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
      videoid: '4230322585001',
      account: '20318290001'
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
      id: 'brightcovePlayerAudio',
      videoid: '4230322585001',
      account: '20318290001'
    });
  </script>
</div>
```

### ④ Full Custom Player

``` html
<div id="brightcovePlayerCustom">
  <script>
    var PMB = new PLAYER_MODULE_BRIGHTCOVE({
      mode: 'movie',

      id: 'brightcovePlayerCustom',
      ui_controls: true,
      ui_autoplay: false,
      ui_default: true,
      ui_default_css : true,

      videoid: '4230322585001',
      account: '20318290001',
      player: 'default',

      loop: false,
      muted: false,
      volume: 0.5,
      stop_outfocus : true,

      width: '480px',
      height: '300px',

      poster: 'https://placehold.jp/750x500.png',

      add_style : '',
      classname_loaded_wrap : 'is-pmb-loaded-wrap',
      classname_active_wrap : 'is-pmb-active-wrap',
      classname_active: 'is-pmb-active',
      on: {
        PlayerInit: function(player){
          console.log('PlayerInit', player);
          console.log(player.GetMediaInfo());
          console.log(player.GetPoster());
        },
        PlayerEnded: function(player){
          console.log('PlayerEnded', player);
        },
        PlayerPlay: function(player){
          console.log('PlayerPlay', player);
        },
        PlayerPause: function(player){
          console.log('PlayerPause', player);
          console.log(player.GetTime());
          console.log(player.GetTimeMax());
          console.log(player.GetTimeRatio());
          console.log(player.GetTimeDown());
        },

        TimeUpdate : function(obj){
          console.log('TimeUpdate', obj);
        },
        VolumeChange : function(obj){
          console.log('VolumeChange', obj);
        },

        Play: function(player){
          console.log('Play', player);
        },
        PlayPrep: function(player){
          console.log('PlayPrep', player);
        },
        Pause: function(player){
          console.log('Pause', player);
        },
        Stop: function(player){
          console.log('Stop', player);
        },
        StopAll: function(player){
          console.log('StopAll', player);
        },
        Change: function(player){
          console.log('Change', player);
          console.log(player.GetMediaInfo());
          console.log(player.GetPoster());
        }
      }
    });
  </script>

  <button class="btn btn-secondary" onclick="PMB.Play()">Media再生(Play)</button>
  <button class="btn btn-secondary" onclick="PMB.Stop()">Media停止(Stop)</button>
  <button class="btn btn-secondary" onclick="PMB.PauseAll()">Media全一時停止(PauseAll)</button>
  <button class="btn btn-secondary" onclick="PMB.StopAll()">Media全停止(StopAll)</button>

  <button class="btn btn-secondary" data-PMB-id="4230322585001" onclick="PMB.Change('4230322585001')">Media変更 id=4230322585001</button>
  <div class="btn btn-secondary" data-PMB-id="4231692338001" onclick="PMB.Change('4231692338001')">
    Media変更 id=4231692338001<br><br>
    <p class="ui-time">00:00</p>
    <p class="ui-time_down">00:00</p>
  </div>

  <button class="btn btn-secondary" onclick="PMB.SeekTo(30)">Media再生位置変更(SeekTo 30s)</button>
  <button class="btn btn-secondary" onclick="PMB.SeekTo(60)">Media再生位置変更(SeekTo 60s)</button>
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
| stop_outfocus  | boolean | false   | フォーカスが外れた時に自動停止するか指定します。<br>デフォルトでは、自動停止しません。<br>※`true`を設定すると、フォーカスが外れた時にメディアが自動停止します。                                   |
| mode           | string  | 'movie' | `'movie'` -> 動画モード<br>`'audio` -> 音声モード<br><br>デフォルトでは、動画モードになります。<br>動画か音声のみかを簡単に切り替えが出来ます。<br>※`'audio'`を設定すると、動画が表示されません。 |
| poster         | string  | null    | 動画のポスター画像を設定できます。<br>画像のパスを設定することで、サムネイルとして読み込まれます。                                                                                                 |

<br>

## Dependencies

none

<br><br><br>

___

## Licence

[MIT](https://github.com/yama-dev/js-player-module-brightcove/blob/master/LICENSE)

<br>

## Author

[yama-dev](https://github.com/yama-dev)

