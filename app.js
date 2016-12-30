var express = require('express'),
    less = require('less-middleware'),
    morgan = require('morgan');

var app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(morgan)
app.use(less({
  src: __dirname + "/public",
  compress: true
}));
app.use(express.static(__dirname + '/public'))

module.exports = app;
