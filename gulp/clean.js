/**
 * IMPORT MODULES
 */
// Config
import CONFIG from '../config';

// Gulp
import gulp from 'gulp';
import del from 'del';

/*
 * TASKS
 */
gulp.task('clean', () => {
  return del(CONFIG.cleanFile).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});
