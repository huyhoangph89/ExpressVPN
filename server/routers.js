const fs = require('fs');
const path = require('path');
const layoutExt = '.pug';
const views = path.join(__dirname, '../app/views');
const CONFIG = require('../script-source.js');

const routers = (app, cb) => {
  let jsPath = [];
  CONFIG.map(js => {
    //remove root path ./app
    js = js.slice(3);
    // use new array of js path and inject to pug
    jsPath.push(js);
  });
  // console.log(jsPath);
  app.get('/me', (req, res) => {
    res.send({
      app: 'Frontend template',
      version: '1.0.0'
    });
  });
  
  app.get('/', (req, res) => {
    res.render(views + '/index', { jsPath });
  });
  
  app.get('/(:subPath)/(:view).html', function(req, res) {
    res.render(views + '/' + req.params.subPath + '/' + req.params.view, { jsPath });
  });
  
  fs.readdir(views, (err, files) => {
    if (err) return;
    let len = files.length;
    files.forEach((file, i) => {
      if (path.extname(file) === layoutExt) {
        const fileName = path.basename(file, layoutExt);
        const pathFileName = fileName + '.html';
        app.get('/' + pathFileName, (req, res) => {
          res.render(views + '/' + fileName, { jsPath });
        });
      }
      if (i === len - 1) {
        typeof cb === 'function' && cb();
      }
    });
  });
};

module.exports = routers;
