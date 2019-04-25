const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

var validateUsername = function (username) {
    return validator.isLowercase(username);
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        validate: [validateUsername, 'Username did not pass validation']

    },
    password: {
        type: String
    },

})


const User = mongoose.model('user', UserSchema);
module.exports = User;