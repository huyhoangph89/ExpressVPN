// Task to open server
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';

gulp.task('nodemon', function(done) {
  let isStart = false,
    stream = nodemon({
      script: 'server/app.js',
      ignore: ['node_modules/**', 'app/scripts/**/*'],
      ext: 'js', // watch extension to run tasks
      watch: ['server', 'gulp_modules'],
      delay: 1,
      done: done
    });
  stream
    .on('start', function() {
      console.log('----------- Application has started! -----------\n');
      if (!isStart) {
        done();
        isStart = true;
      }
    })
    .on('restart', function() {
      console.log('----------- Application has restarted! -----------\n');
    })
    .on('crash', function() {
      console.error('----------- Application has crashed! -----------\n');
      // stream.emit('restart', 1)  // restart the server in 1 seconds
    })
    .on('quit', () => {
      // debug('nodedmon has quit');
      console.log('----------- Application has quit! -----------\n');
      process.exit();
    });
});
