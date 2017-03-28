/**
 * Gulp設定ファイル
 */
import CONFIG from './config';
import pkg from './package.json';

/**
 * IMPORT MODULES
 */
import gulp from 'gulp';
import runSequence from 'run-sequence';

/**
 * IMPORT TASKS
 */
import tasks from './gulp/load';

let taskArray = ['sass'];
if(CONFIG.flg_browserify){
  taskArray.push('js-browserify');
}
if(CONFIG.flg_jade){
  taskArray.push('jadehtml');
}
if(CONFIG.flg_babel){
  taskArray.push('babel');
}

/*
 * DEFAULT TASKS
 */
gulp.task('default', (callback) => {
  return runSequence(taskArray,'js-libs','watch',callback);
});

/**
 * RELEASE TASKS
 */
gulp.task('release', (callback) => {
  return runSequence(taskArray,'js-libs','deploy','clean',callback);
});
