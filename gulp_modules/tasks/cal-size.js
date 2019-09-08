// Task to get the size of the app project
import size from 'gulp-size';
import gulp from 'gulp';

gulp.task('app-size', () =>
  gulp.src(mainPath.dev + '**').pipe(
    size({
      // showFiles: true,
      showTotal: true,
      pretty: true
    })
  )
);

gulp.task('deploy-size', () =>
  gulp.src(mainPath.public + '**').pipe(
    size({
      // showFiles: true,
      showTotal: true,
      pretty: true
    })
  )
);
