var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/index');
});

router.get('/db', function (req, res) {
    res.render('pages/db');
});

module.exports = router;