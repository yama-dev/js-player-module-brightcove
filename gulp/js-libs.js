/**
 * IMPORT MODULES
 */
import CONFIG from '../config';
import gulp from 'gulp';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';

gulp.task('js-libs', () => {
  gulp.src([CONFIG.sourceDirectory.jsLib])
  .pipe(plumber())
  .pipe(concat('libs.js'))
  // .pipe(gulpIf( flg_min, uglify({preserveComments: 'some'}) ) )
  .pipe(gulp.dest(CONFIG.sourceDirectory.js))
  .pipe(browserSync.reload({stream:true}));
});
