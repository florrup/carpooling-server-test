var mongoose = require('mongoose');
var Users = require('../models/users');

exports.getAllUsers = function (req, res) { 
    Users.find({}, function (err, user) { // returns all the items from the Users collection as an array
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.postNewUser = function (req, res) {
    var newUser = new Users(req.body);
    newUser.save(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('User ' + user.name + ' created!\n');
    });
};

exports.deleteAllUsers = function (req, res) {
    Users.remove({}, function (err, deleted) { // deletes all the Users from the collection
        if (err) {
            res.send(err);
        }
        res.end('All users were deleted\n');
    });
};

exports.getUser = function (req, res) {
    Users.findById(req.params.userId, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.modifyUser = function (req, res) {
    Users.findById(req.params.userId, function (err, user) {
        if (err) {
            res.send(err);
        }
        user.name = req.body.name;  // modify info
        user.age = req.body.age;
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    });
};

exports.deleteUser = function (req, res) {
    User.remove({ _id: req.params.userId }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'User deleted' });
    });
};