/**
 * IMPORT MODULES
 */
// Config
import CONFIG from '../config';

// Gulp
import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import jade from 'gulp-jade';

/*
 * TASKS
 */
gulp.task('jadehtml', function() {
  return gulp.src([CONFIG.sourceDirectory.jade,'!'+CONFIG.sourceDirectory.jadeNone])
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(jade({
    pretty: true
    //client: true //output to javascript
  }))
  .pipe(gulp.dest(CONFIG.outputDirectory.dev))
});
