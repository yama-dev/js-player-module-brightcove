# js-player-module-brightcove

## 概要

Brightcoveプレーヤーのライブラリ

<br>

## 使い方(Using)

### 1. インストール

#### このリポジトリ`js-player-module-brightcove`をダウンロードしてください。

#### ダウンロード https://github.com/yama-dev/js-player-module-brightcove/releases/latest

### 2. ファイルの読み込み

```html
<script src="./assets/js/js-player-module-brightcove.js" charset="UTF-8"></script>
```

### 3. サンプルコード

#### BASIC 

<img src="https://raw.githubusercontent.com/yama-dev/assets/master/images/js-player-module-brightcove/brightcovePlayer1.png" style="width: 100%; max-width: 520px;" alt="">

```html
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

<br>

## オプション(Options)
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

## 依存ライブラリ(Dependencies)

none

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

## Contribution

1. Fork it ( https://github.com/yama-dev/js-player-module-brightcove/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

<br>

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

<br>

## Author

[yama-dev](https://github.com/yama-dev)

