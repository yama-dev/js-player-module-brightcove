/**
 * IMPORT MODULES
 */
// Config
import CONFIG from '../config';

// Node.js
import util from 'util';
import glob from 'glob';

// Gulp
import gulp from 'gulp';
import uglify from 'gulp-uglify'
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import gulpIf from 'gulp-if';
import cache from 'gulp-cached';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
// Gulp-Browserify
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import watchify from 'watchify';

/*
 * TASKS
 */
gulp.task('js-browserify', () => {

  // コンパイル対象のファイルの抽出
  let fileArray = glob.sync('./src/**/[^_]*.es6',{
    dot: true
  });

  // Browserify
  let browserifyFunc = function(fileList){
    fileList.forEach((entryPoint) => {

      let filePath = entryPoint.replace(entryPoint,'');

      let browserifyOptions = {
        entries: [entryPoint],
        transform: babelify.configure({
          presets: ["es2015"],
          // comments: false
        }),
        ignore:['[^_]*.es6'],
        // debug: true,
        cache: {},
        packageCache: {}
      };

      let watchifyStream = watchify(browserify(browserifyOptions));

      let execBundle = () => {
        util.log(` building ${entryPoint}...`);
        return watchifyStream
          .bundle()
          .on('error', util.log.bind(util, 'Browserify Error'))
          .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
          }))
          .pipe(source(entryPoint.replace('.es6','.js')))
          .pipe(buffer())
          .pipe(gulpIf(CONFIG.flg_min,uglify({preserveComments: 'some'})))
          .pipe(gulp.dest(filePath))
          .pipe(browserSync.reload({stream:true}));
      };

      watchifyStream.on('update', execBundle);
      watchifyStream.on('log', util.log);

      return execBundle();
    });
  }
  browserifyFunc(fileArray);
});
