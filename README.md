# JS PLAYER MODULE BRIGHTCOVE

## Feature

Brightcove Player API を使用した BrightcoveカスタムPlayerです。
公式ドキュメントはこちら。https://brightcovelearning.github.io/Brightcove-API-References/

<br>

## Installation

- npm -> coming soon...

- Standalone -> [link](https://raw.githubusercontent.com/yama-dev/js-player-module-brightcove/master/dist/js-player-module-brightcove.min.js)

<br>

## DownLoad

#### ダウンロードURL [yama-dev/js-player-module-brightcove](https://github.com/yama-dev/js-player-module-brightcove/releases/latest)

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

**UI**

<img src="https://raw.githubusercontent.com/yama-dev/assets/master/images/js-player-module-brightcove/brightcovePlayer1.png" style="width: 100%; max-width: 520px; border: 1px solid #eee;" alt="">

**サンプルコード**

``` html
<div id="brightcovePlayer1">
  <script>
    new PLAYER_MODULE_BRIGHTCOVE({
      id:'brightcovePlayer1',
      videoid:'4217352666001',
      account:'20318290001',
      ui_controls:true,
      ui_default:true
    });
  </script>
</div>
```

### ②AUDIO Player

**サンプルコード**

``` html
<div id="brightcovePlayer2">
  <script>
    new PLAYER_MODULE_BRIGHTCOVE({
      mode: 'audio',
      id:'brightcovePlayer2',
      videoid:'4217352666001',
      account:'20318290001'
    });
  </script>
</div>
```

<br>

## API

### Default

```javascript
id
```
プレーヤーを出力する要素のidを設定します。  
※省略不可  
  
```javascript
videoid
```
動画のvideoidを設定します。  
※省略不可  
  
```javascript
account
```
BrightcovePlayerのaccountを設定します。  
※省略不可  
  

### Options

```javascript
ui_controls //false
```
`control`を表示するかしないかを指定します。  
デフォルトでは、表示されません。  
  
```javascript
ui_default //false
```
ライブラリであらかじめ用意したUIパーツを表示するかしないかを指定します。  
デフォルトでは、表示されません。  

<br>


## Browser support

| Browser          | OS、version | 
| ---               | ---            | 
| Internet Explorer | 11+            | 
| Chrome            | 最新           | 
| Firefox           | 最新           | 
| Safari            | 最新           | 
| Android           | 5.0+ Chrome    | 
| iOS               | 10.0+ safari   | 

[Useble Browser version LIST](./docs/device-check.md)

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

