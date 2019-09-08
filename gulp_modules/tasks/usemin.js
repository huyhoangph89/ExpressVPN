import gulp from 'gulp';
import usemin from 'gulp-usemin';
import rev from 'gulp-rev';
import cleanCss from 'gulp-clean-css';
import uglify from 'gulp-uglify';
// import browserSync from 'browser-sync';
gulp.task('usemin-build', () =>
  gulp
    .src(mainPath.public + '*.html')
    .pipe(
      usemin({
        // js: [uglify, rev, 'concat'],
        css: [cleanCss, rev, 'concat'],
        development: ['']
      })
    )
    .pipe(gulp.dest(mainPath.public))
);
gulp.task('usemin-build-js', () =>
  gulp
    .src(mainPath.public + '*.html')
    .pipe(
      usemin({
        jsAttributes: {
          defer: true
        },
        js: [uglify, rev, 'concat'],
        development: ['']
      })
    )
    .pipe(gulp.dest(mainPath.public))
);
