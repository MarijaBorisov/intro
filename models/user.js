const mongoose = require('mongoose');
const validator = require('validator');
const logger = require('../config/logger').logger;

const Schema = mongoose.Schema;

var validateUsername = function (username) {
    logger.info("Checking username...");
    if (validator.isLowercase(username)) {
        logger.info("Username validaton for lowerCase passed");
        return true;
    } else {
        logger.error("Username validaton for lowerCase did not pass");
        return false;
    }

}
var validatePassword = function (username) {
    logger.info("Checking password...");
    if (!validator.isAlphanumeric(username)) {
        logger.info("Username validaton for isAlphanumeric passed, must contain at least one non-alphanumeric character");
        return true;
    } else {
        logger.error("Username validaton for isAlphanumeric did not pass");
        return false;
    }

}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        validate: [validateUsername, 'Username did not pass validation']

    },
    password: {
        type: String,
        minlength: 5,
        validate: [validatePassword, 'Password did not pass validation']
    },

})


const User = mongoose.model('user', UserSchema);
module.exports = User;