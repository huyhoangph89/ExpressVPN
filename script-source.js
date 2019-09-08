const fg = require('fast-glob');
// const devSource = 'app/scripts/dev/splash_plugins/*.js';
// const pageSource = 'app/scripts/dev/pages/*.js';
// const vendorSource = 'app/scripts/*.js';

let jsArray = [];

const jsSource =
  fg.sync(['app/scripts/**/*.js', '!app/scripts/dev/pages/*.js']);

[...jsSource].map(source => {
  if (source.includes('polyfill') || source.includes('modernizr') || source.includes('jquery-3')) {
    jsArray.splice(0, 0, source);
  }
  else {
    jsArray.push(source);
  }
});

module.exports = jsArray;

// const jsVendor = new Promise((resolve, reject) => {
//   glob(vendorSource, (er, files) => {
//     files.map(file => {
//       if (file.includes('polyfill') || file.includes('modernizr') || file.includes('jquery')) {
//         jsArray.splice(0, 0, file);
//       }
//       else {
//         jsArray.push(file);
//       }
//     });
//     resolve(jsArray);
//   });
// });
//
// const devScripts = new Promise((resolve, reject) => {
//   glob(devSource, (er, files) => {
//     files.map(file => {
//       jsArray.push(file);
//     });
//     resolve(jsArray);
//   });
// });



