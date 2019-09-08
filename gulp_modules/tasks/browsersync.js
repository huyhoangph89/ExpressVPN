import gulp from 'gulp';
import browserSync from 'browser-sync';

// Task to open browsersync
gulp.task('browsersync-reload', () => {
  browserSync.reload();
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: mainPath.public
    },
    port: 3001,
    middleware: (req, res, next) => {
      if (req.url === '/') {
        req.url = '/index.html';
      }
      return next();
    }
  });
});
