/**
 * IMPORT MODULES
 */
import CONFIG from '../config';
import gulp from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import pleeease from 'gulp-pleeease';
import cache from 'gulp-cached';
import gulpIf from 'gulp-if';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';

gulp.task('sass', () => {
  gulp.src(CONFIG.sourceDirectory.sass)
  .pipe(cache('sass'))
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(sass({outputStyle: CONFIG.SASS_OUTPUT_STYLE}))
  //.pipe(concat('min.css'))
  .pipe(pleeease({
    autoprefixer: {'browsers': CONFIG.SASS_AUTOPREFIXER_BROWSERS},
    minifier: CONFIG.flg_min
  }))
  //.pipe(header('@charset 'utf-8';\n'))
  .pipe(gulp.dest(CONFIG.outputDirectory.dev))
  .pipe(browserSync.reload({stream:true}));
});
