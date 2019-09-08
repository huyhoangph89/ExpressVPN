import gulp from 'gulp';
const sftp = require('gulp-sftp');
const env = require('dotenv').config();

//Deploys the output onto your server
gulp.task('deploy', () => {
  const conn = sftp({
    host: `${env.parsed.HOST}`,
    user: `${env.parsed.USER}`,
    key: `${env.parsed.KEY_LOCATION}`,
    remotePath: `${env.parsed.REMOTE_PATH}`
  });

  const globs = mainPath.public + '**/*';

  const src = {
    base: mainPath.public,
    buffer: false
  };

  return gulp.src(globs, src).pipe(conn);
});
