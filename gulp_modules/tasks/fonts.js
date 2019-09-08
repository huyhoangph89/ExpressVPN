import gulp from 'gulp';

// gulp.task('font-awesome', function() {
//   return gulp
//     .src('node_modules/font-awesome/fonts/*')
//     .pipe(gulp.dest(path.dev.fonts));
// });

gulp.task('fonts', () =>
  gulp.src(path.dev.fonts + '**/*').pipe(gulp.dest(path.public.fonts))
);

gulp.task('fonts-deploy', () =>
  gulp.src(path.dev.fonts + '**/*').pipe(gulp.dest(path.deploy.fonts))
);
