var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// create a schema
var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;