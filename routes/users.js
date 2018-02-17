var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Users = require('../models/users');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.get(function (req, res, next) {
    Users.find({}, function (err, user) { // returns all the items from the Users collection as an array
        if (err) throw err;
        res.json(user);
    });
})

.post(function (req, res, next) {
    Users.create(req.body, function (err, user) {
        if (err) throw err;
        console.log('User created!');
        var name = user.name;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the user with name: ' + name);
    });
})

.delete(function (req, res, next) {
    Users.remove({}, function (err, resp) { // deletes all the Users from the collection
        if (err) throw err;
        res.json(resp);
    });
);

module.exports = userRouter;