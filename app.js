var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

var app = express();

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.get('/', (req, res) => res.render('pages/index'));

app.listen(PORT, () => console.log(`Listening on ${PORT }`));

