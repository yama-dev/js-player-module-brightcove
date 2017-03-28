/**
 * IMPORT MODULES
 */
// Config
import CONFIG from '../config';

// Gulp
import gulp from 'gulp';

/*
 * TASKS
 */
gulp.task('deploy', () => {
  return gulp.src(CONFIG.deployFile,{
      base:CONFIG.outputDirectory.src
    })
    .pipe(gulp.dest(CONFIG.outputDirectory.release))
});
