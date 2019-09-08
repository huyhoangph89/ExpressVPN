import gulp from 'gulp';
import cache from 'gulp-cache';
import del from 'del';

gulp.task('clean:public', () => del.sync(['!public/assets/images', 'public']));
// gulp.task('clean:public', () => {
//   del(['public/**/**', '!public/assets/images']);
// });
gulp.task('clean-js-scss', () => {
  // gulp
  //   .src(path.public.scripts + 'dev/pages/*')
  //   .pipe(gulp.dest(path.public.scripts));
  // del('public/scripts/dev/');
  del([
    'public/assets/styles/*',
    '!public/assets/styles/main.min.css',
    '!public/assets/styles/internal.min.css',
    '!public/assets/styles/fontface.min.css'
  ]);
});
gulp.task('clean-scss', () => {
  del([
    'public/assets/styles/*',
    '!public/assets/styles/main.min.css',
    '!public/assets/styles/internal.min.css',
    '!public/assets/styles/fontface.min.css'
  ]);
});
gulp.task('clean-js', () => {
  del(['public/scripts/*', '!public/scripts/main.min.js']);
});
