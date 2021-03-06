var express = require('express'),
    morgan = require('morgan');

var app = express();

// Busters file for cache busting
const busters = require('./busters.json');
const CACHE_TIME = 60 * 60 * 24 * 7;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public', {maxAge: CACHE_TIME*1000}));

// Set request headers used for every route and include cache busting
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=' + CACHE_TIME);
  res.set('X-Powered-By', 'Triston Jones!');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Content-Security-Policy',
    "default-src 'none'; img-src 'self' https://www.google-analytics.com;" +
    "script-src 'self' https://www.google-analytics.com;" +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
    "font-src 'self' https://fonts.gstatic.com data;");

  res.locals.busters = busters;
  next();
});

/**
 * Routers
**/
app.use('/', require('./routes/index.js'));

// 404 Handler
app.use((req, res, next) => {
  res.status(404);
  res.render('notFound', {title: 'Not Found'});
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {message: err.message});
});

module.exports = app;
