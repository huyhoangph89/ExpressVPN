import gulp from 'gulp';
import cacheFile from 'gulp-cached';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import gconcat from 'gulp-concat';
import jshint from 'gulp-jshint';
import plumber from 'gulp-plumber';
import flatten from 'gulp-flatten';

const jsBundle = require('../../script-source.js');

const jsDev = path.dev.scripts + 'dev/**/*.js';

// JS hint task with custom styles
gulp.task('jshint', () =>
  gulp
    .src(jsDev)
    .pipe(cacheFile('jshint'))
    .pipe(plumber({ errorHandler: onError }))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish', { beep: true }))
);

gulp.task('js-pages', () =>
  gulp
    .src(path.dev.scripts + 'dev/pages/*.js')
    .pipe(babel())
    .pipe(uglify())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.public.scripts + 'dev/pages'))
);

gulp.task('scripts', ['jshint'], () =>
  gulp
    .src(jsBundle)
    .pipe(flatten())
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gconcat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.public.scripts))
);
