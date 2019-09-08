import gulp from 'gulp';
import cacheFile from 'gulp-cached';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import pugLintStylish from 'puglint-stylish';
import merge from 'merge-stream';
import inject from 'gulp-inject';
import inlinesource from 'gulp-inline-source';

gulp.task('pug-linter', () =>
  gulp
    .src(path.dev.views + '**/*.pug')
    .pipe(cacheFile('pug-linter'))
    .pipe(plumber({ errorHandler: onError }))
    .pipe(pugLinter('.pug-lintrc.json'))
    .pipe(pugLinter.reporter(pugLintStylish, { beep: true }))
);
gulp.task('handlebars', () => {
  gulp
    .src(path.dev.views + 'handlebars/*.pug')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      pug({
        doctype: 'html',
        pretty: true
      })
    )
    .pipe(gulp.dest(path.public.views + 'handlebars/'));
});
// combine template with compress options to optimze speed loading of browser
gulp.task('views', ['pug-linter'], () => {
  let pages = gulp
    .src(path.dev.views + '*.pug')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      pug({
        doctype: 'html',
        pretty: true
      })
    )
    .pipe(inject(
      gulp.src('public/scripts/main.min.js',
        {read: false}),
        {name: 'main', ignorePath: 'public', addRootSlash: false}))
    .pipe(gulp.dest(mainPath.public));
  // let component = gulp
  //   .src(path.dev.views + 'components/*.pug')
  //   .pipe(plumber({ errorHandler: onError }))
  //   .pipe(
  //     pug({
  //       doctype: 'html',
  //       pretty: true
  //     })
  //   )
  //   .pipe(gulp.dest(mainPath.public + 'components/'));
  let data = gulp
    .src(path.dev.views + 'data/*.json')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(mainPath.public + 'data/'));
  // let handlebars = gulp
  //   .src(path.dev.views + 'handlebars/*.pug')
  //   .pipe(plumber({ errorHandler: onError }))
  //   .pipe(
  //     pug({
  //       doctype: 'html',
  //       pretty: true
  //     })
  //   )
  //   .pipe(gulp.dest(mainPath.public + 'handlebars/'));
  return merge(pages, data);
});

// combine template pug with pretty option
gulp.task('views-deploy', ['pug-linter'], () => {
  let pages = gulp
    .src(path.dev.views + '*.pug')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      pug({
        doctype: 'html',
        pretty: true
      })
    )
    .pipe(gulp.dest(mainPath.deploy));
  let data = gulp
    .src(path.dev.views + 'data/*.json')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(mainPath.deploy + 'data/'));
  let handlebars = gulp
    .src(path.dev.views + 'handlebars/*.pug')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      pug({
        doctype: 'html',
        pretty: true
      })
    )
    .pipe(gulp.dest(mainPath.deploy + 'handlebars/'));
  return merge(pages, data, handlebars);
});

gulp.task('inlinesource', function () {
  return gulp.src(mainPath.public+'*.html')
  .pipe(inlinesource())
  .pipe(gulp.dest(mainPath.public));
});
