/**
 * IMPORT MODULES
 */
// Config
import CONFIG from '../config';

// Gulp
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import htmlhint from 'gulp-htmlhint';
import notify from 'gulp-notify';

/*
 * TASKS
 */
gulp.task('htmllint', () => {
  return gulp.src([CONFIG.watchDirectory.html])
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(htmlhint(CONFIG.HTMLHINT))
  .pipe(htmlhint.reporter())
});
