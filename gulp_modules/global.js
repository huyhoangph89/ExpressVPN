import beeper from 'beeper';

global.onError = errMess => {
  beeper(3);
  console.log(errMess);
  this.emit('end');
};

// Browser definitions for autoprefixer
global.AUTOPREFIXER_BROWSERS = [
  'last 2 versions',
  'ie >= 10',
  'ios >= 8',
  'android >= 4.4'
];

global.mainPath = {
  dev   : 'app/',
  public: 'public/'
};

global.path = {
  dev: {
    assets : mainPath.dev + 'assets/',
    styles : mainPath.dev + 'assets/styles/',
    images : mainPath.dev + 'assets/images/',
    fonts  : mainPath.dev + 'assets/fonts/',
    views  : mainPath.dev + 'views/',
    scripts: mainPath.dev + 'scripts/'
  },

  public: {
    assets : mainPath.public + 'assets/',
    styles : mainPath.public + 'assets/styles/',
    images : mainPath.public + 'assets/images/',
    fonts  : mainPath.public + 'assets/fonts/',
    scripts: mainPath.public + 'scripts/',
    views  : mainPath.public + 'views/'
  }
};