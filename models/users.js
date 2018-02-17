var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    age: {
        type: Number
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;