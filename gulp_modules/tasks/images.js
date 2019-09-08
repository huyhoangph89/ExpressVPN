import gulp from 'gulp';
// import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';
//need to run 'brew install libpng'
import imageminGiflossy from 'imagemin-giflossy';

gulp.task('images', () =>
  gulp
    .src(path.dev.images + '**/*')
    .pipe(
      imagemin(
        [
          //png
          imageminPngquant({
            speed: 10, //1 (brute-force) to 11 (fastest)
            quality: [0.7, 0.85] //lossy settings
          }),
          imageminZopfli({
            more: true
            // iterations: 50 // very slow but more effective
          }),
          //gif
          // imagemin.gifsicle({
          //     interlaced: true,
          //     optimizationLevel: 3
          // }),
          //gif very light lossy, use only one of gifsicle or Giflossy
          imageminGiflossy({
            optimizationLevel: 1,
            optimize: 1, //keep-empty: Preserve empty transparent frames
            lossy: 30
          }),
          //svg
          imagemin.svgo({
            plugins: [
              {
                removeViewBox: false
              }
            ]
          }),
          //jpg lossless
          // imagemin.jpegtran({
          //   progressive: true
          // }),
          //jpg very light lossy, use vs jpegtran
          imageminMozjpeg({
            quality: 60,
            progressive: true
          })
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest(path.public.images))
);
