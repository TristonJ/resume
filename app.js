var express = require('express'),
    morgan = require('morgan');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

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
