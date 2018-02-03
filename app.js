var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/');

const PORT = process.env.PORT || 5000;
const HOSTNAME = 'localhost';

var app = express();

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(routes);

app.listen(PORT, HOSTNAME, function () {
    console.log(`Listening on ${PORT}`)
});

module.exports = app;

