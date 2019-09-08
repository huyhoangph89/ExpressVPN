import plumber from 'gulp-plumber';
import prettify from 'gulp-jsbeautifier';
import gulp from 'gulp';

gulp.task('copy-data', () =>
  gulp
    .src('app/data/*.json')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      prettify({
        indent_size: 2
      })
    )
    .pipe(gulp.dest(mainPath.public + 'data/'))
);

gulp.task('copy-data-deploy', () =>
  gulp
    .src('app/views/data/*.json')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      prettify({
        indent_size: 2
      })
    )
    .pipe(gulp.dest(mainPath.deploy + 'data/'))
);
