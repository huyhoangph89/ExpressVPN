import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('default', function(done) {
  runSequence(['nodemon', 'watch'], done);
});
