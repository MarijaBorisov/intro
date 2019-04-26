const mongoose = require('mongoose');
const validator = require('validator');
const logger = require('../logger').logger;

const Schema = mongoose.Schema;



var validateUsername = function (username) {
    logger.info("Checking username...");
    if (validator.isLowercase(username)) {
        logger.info("Username validaton passed");
        return true;
    } else {
        logger.error("Username validaton didnt pass");
        return false;
    }

}
var validatePassword = function (username) {
    logger.info("Checking password...");
    if (!validator.isAlphanumeric(username)) {
        logger.info("Password validaton passed");
        return true;
    } else {
        logger.error("Password validaton didnt pass");
        return false;
    }

}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        validate: [validateUsername, 'Username is not valid']

    },
    password: {
        type: String,
        minlength: 6,
        validate: [validatePassword, 'Password is not valid']
    },

})


const User = mongoose.model('user', UserSchema);
module.exports = User;