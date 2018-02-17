var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Initiate connection to MongoDB server using Mongoose
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/conFusion'; // conFusion is the name of the db
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var routes = require('./routes/index');
var users = require('./routes/users');

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

app.use('/', routes);
app.use('/users', users);

app.listen(PORT, HOSTNAME, function () {
    console.log(`Listening on http://${HOSTNAME}:${PORT}`)
});

module.exports = app;

