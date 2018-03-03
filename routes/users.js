var express = require('express');
var bodyParser = require('body-parser');
var Verify = require('./verify');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

var User = require('../controllers/userController');

userRouter.route('/')
    .get(Verify.verifyOrdinaryUser, User.getAllUsers)
    //.post(User.postNewUser)
    .delete(User.deleteAllUsers);

userRouter.route('/register')
    .post(User.postNewUser);

userRouter.route('/login')
    .post(User.loginUser);

userRouter.route('/logout')
    .post(User.logoutUser);

userRouter.route('/:userId')
    .get(User.getUser)
    .put(User.modifyUser)
    .delete(User.deleteUser);

module.exports = userRouter;