var express = require('express');
var bodyParser = require('body-parser');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

var User = require('../controllers/userController');

userRouter.route('/')
    .get(User.getAllUsers)
    .post(User.postNewUser)
    .delete(User.deleteAllUsers);

userRouter.route('/:userId')
    .get(User.getUser)
    .put(User.modifyUser)
    .delete(User.deleteUser);

module.exports = userRouter;