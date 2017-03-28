/**
 * IMPORT MODULES
 */
// Config
import CONFIG from '../config';

// Gulp
import gulp from 'gulp';
import uglify from 'gulp-uglify'
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';

/*
 * TASKS
 */
gulp.task('eslint', () => {
  return gulp.src([CONFIG.sourceDirectory.es6])
  .pipe(plumber())
  .pipe(eslint({
    globals: {
      $: true,
      'jQuery':true
    },
  }))
  .pipe(eslint.format())
});
gulp.task('babel',['eslint'], () => {
  return gulp.src([CONFIG.sourceDirectory.es6])
  .pipe(plumber())
  .pipe(babel({
    // presets: ["es2015-loose"]
    presets: ["es2015"],
    compact: false,
    minified: false,
    comments: true
  }))
  //.pipe(concat('min.js'))
  .pipe(gulpIf( CONFIG.flg_min, uglify({preserveComments: 'some'}) ) )
  .pipe(gulp.dest(CONFIG.outputDirectory.dev))
  .pipe(browserSync.reload({stream:true}));
});
