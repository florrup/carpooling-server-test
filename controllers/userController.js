var mongoose = require('mongoose');
var Users = require('../models/users');
var passport = require('passport');
var Verify = require('../routes/verify');

exports.getAllUsers = function (req, res) { 
    Users.find({}, function (err, user) { // returns all the items from the Users collection as an array
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.postNewUser = function (req, res) {
    Users.register(new Users({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            return res.status(500).json({ err: err });
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({ status: 'Registration successful' });
        });
    });
};

exports.loginUser = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err); // will generate a 500 error
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }

        req.login(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            var token = Verify.getToken(user.toJSON()); // need to convert the user object
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
};

exports.logoutUser = function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
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
        user.username = req.body.username;  // modify info
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