/**
 * IMPORT MODULES
 */
// Config
import CONFIG from '../config';

// Gulp
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import connectPhp from 'gulp-connect-php';

/*
 * TASKS
 */
gulp.task('server', () => {
  if(CONFIG.flg_php){
    //Use php
    connectPhp.server({
      port: 8000,
      base: CONFIG.outputDirectory.dev
    }, function (){
      browserSync({
        proxy: 'localhost:8000'
      });
    });
  } else {
    //Use html only
    browserSync({
      server: {
        baseDir: CONFIG.outputDirectory.dev,
      },
      notify: true,
      logPrefix: 'browserSync',
      // https: true,
    })
  };
  gulp.watch(CONFIG.watchDirectory.html, browserSync.reload);
  if(CONFIG.flg_php){
    gulp.watch(CONFIG.watchDirectory.php, browserSync.reload);
  }
  gulp.src('').pipe(notify({
    title: 'Start Gulp',
    message: new Date(),
    sound: 'Glass'
  }));
});

gulp.task('watch',['server'], () => {
  if(!CONFIG.flg_browserify) {
    gulp.watch(CONFIG.watchDirectory.es6,['babel']);
  }
  gulp.watch(CONFIG.watchDirectory.sass,['sass']);
  gulp.watch(CONFIG.watchDirectory.html,['htmllint']);
  if(CONFIG.flg_jade){
    gulp.watch(CONFIG.watchDirectory.jade,['jadehtml']);
  }
});
