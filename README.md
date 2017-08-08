# js-player-module-brightcove

## 概要

Brightcoveプレーヤーのライブラリ

<br>

## インストール(Install)

### 1. ライブラリのダウンロード

#### ダウンロードURL [yama-dev/js-player-module-brightcove](https://github.com/yama-dev/js-player-module-brightcove/releases/latest)

### 2. ファイルの読み込み

For HTML  
Include script.  

``` html
<script src="js-player-module-brightcove.js" charset="UTF-8"></script>
```

<br>

## 使い方(Using)

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


## ブラウザサポート(Browser support)

| ブラウザ          | バージョンなど | 
| ---               | ---            | 
| Internet Explorer | 11+            | 
| Chrome            | 最新           | 
| Firefox           | 最新           | 
| Safari            | 最新           | 
| Android           | 5.0+ Chrome    | 
| iOS               | 10.0+ safari   | 

<br>

## 依存ライブラリ(Dependencies)

none

<br>

## Contribution

1. Fork it ( https://github.com/yama-dev/js-player-module-brightcove/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

<br>

## Develop

### At Development

Install node modules.

``` bash
$ npm install
```

Run Gulp default-task.

``` bash
$ gulp --babel
```

### At Release

Run Gulp release-task.

``` bash
$ gulp release --babel --min
```

<br>

## Licence

[MIT](https://github.com/yama-dev/js-player-module-brightcove/blob/master/LICENSE)

<br>

## Author

[yama-dev](https://github.com/yama-dev)

