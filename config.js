/**
 * タスク設定ファイル
 */
// IMPORT MODULES
import minimist from 'minimist';

const CONFIG_PATH = {
  src     : './src/',
  release : './release/',
  cms     : './cms/',
  php     : './php/',
  twig    : './src_twig/'
};

/**
 * フラグ用変数
 */
let flg_release    = false;
let flg_php        = false;
let flg_jade       = false;
let flg_min        = false;
let flg_babel      = false;
let flg_browserify = false;

let env = minimist(process.argv.slice(2));
console.log(env);
Object.keys(env).forEach(function (key) {
  switch(key){
    case 'release': flg_release = true;
      break;
    case 'php': flg_php = true;
      break;
    case 'jade': flg_jade = true;
      break;
    case 'min': flg_min = true;
      break;
    case 'babel': flg_babel = true;
      break;
    case 'browserify': flg_browserify = true;
      break;
  }
});

export default {
  flg_release   : flg_release,
  flg_php       : flg_php,
  flg_jade      : flg_jade,
  flg_min       : flg_min,
  flg_babel     : flg_babel,
  flg_browserify: flg_browserify,
  outputDirectory: {
    dev     : CONFIG_PATH.src,
    release : CONFIG_PATH.release,
  },
  sourceDirectory: {
    sass    : CONFIG_PATH.src + '**/*.scss',
    jsLib   : CONFIG_PATH.src + 'assets/js/libs/**/*.js',
    js      : CONFIG_PATH.src + 'assets/js',
    es6     : CONFIG_PATH.src + '**/*.es6',
    jade    : CONFIG_PATH.src + '**/*.jade',
    jadeNone: CONFIG_PATH.src + '**/_*.jade',
  },
  watchDirectory: {
    html    : CONFIG_PATH.src + '**/*.html',
    jade    : CONFIG_PATH.src + '**/*.jade',
    css     : CONFIG_PATH.src + '**/*.css',
    sass    : CONFIG_PATH.src + '**/*.scss',
    js      : CONFIG_PATH.src + '**/*.js',
    es6     : CONFIG_PATH.src + '**/*.es6',
    php     : CONFIG_PATH.src + '**/*.php',
  },
  deployFile: [
    CONFIG_PATH.src + '**/*.+(html|css|js|jpg|png|gif)',
  ],
  cleanFile: [
    CONFIG_PATH.release + '**/libs',
    CONFIG_PATH.release + '_**/',
  ],
  SASS_AUTOPREFIXER_BROWSERS: [
    'ie >= 8',
    'ios >= 7',
    'android >= 2.3',
    'last 4 versions'
  ],
  SASS_OUTPUT_STYLE: "expanded", //nested, compact, compressed, expanded.
  HTMLHINT: {
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "attr-value-double-quotes": true,
    "attr-value-not-empty": false,
    "attr-no-duplication": true,
    "doctype-first": true,
    "tag-pair": true,
    "tag-self-close": false,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "alt-require": true,
    "head-script-disabled": false,
    "img-alt-require": true,
    "doctype-html5": true,
    "id-class-value": "false",
    "style-disabled": false,
    "space-tab-mixed-disabled": true,
    "id-class-ad-disabled": true,
    "href-abs-or-rel": false,
    "attr-unsafe-chars": true
  }
}
