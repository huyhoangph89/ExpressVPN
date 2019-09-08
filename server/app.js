const express = require('express'),
  app = express(),
  path = require('path'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  socketio = require('socket.io'),
  routers = require('./routers'),
  watch = require('node-watch'),
  compileSass = require('express-compile-sass'),
  emitter = require('events'),
  port = process.env.PORT || '3000',
  fs = require('fs'),
  https = require('https'),
  http = require('http'),
  createError = require('http-errors'),
  certOptions = process.env.protocol === 'https' && {
    key: fs.readFileSync(path.resolve('./server.key')),
    cert: fs.readFileSync(path.resolve('./server.crt'))
  },
  server = process.env.protocol === 'https' ? https.createServer(certOptions, app) : http.createServer(app),
  io = socketio(server),
  watcher = watch(
    [
      path.join(__dirname, '../app/views/'),
      path.join(__dirname, '../app/scripts/'),
      path.join(__dirname, '../app/assets/styles/')
    ],
    {
      recursive: true
    }
  );

// console.log(app.get('env'));
// watcher.setMaxListeners(0);
// hide warning //
emitter.defaultMaxListeners = 20;

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}


app.set('port', port);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.locals.pretty = true;
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(methodOverride());

//scss
app.use(
  compileSass({
    root: path.join(__dirname, '../app/'),
    sourceMap: true, // Includes Base64 encoded source maps in output css
    sourceComments: false, // Includes source comments in output css
    watchFiles: true, // Watches sass files and updates mtime on main files for each change
    logToConsole: false // If true, will log to console.error on errors
  })
);

app.use(express.static(path.join(__dirname, '../app')));
app.use(morgan('dev'));

app.get('/favicon.ico', (req, res, next) => {
  return res.sendStatus(204);
});

routers(app, () => {
  // app.use((req, res) => {
  //   res.setHeader('Content-Type', 'text/plain');
  //   res.send(JSON.stringify(req.body, null, 2));
  // });

  // app.use(function (req, res ) {
  //   res.status(404).json({status: 'failed', message: '404 not found'});
  // });
  app.use((req, res, next) => {
    return next(createError(404, 'File not found'));
  });
  
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    return res.render('error');
  });

  io.on('connection', socket => {
    watcher.on('change', () => {
      socket.emit('messages', 'Hello from server');
    });
  });

  server.listen(port);
  console.log('Frontend template is running on port ' + port);
});