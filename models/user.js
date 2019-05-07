const mongoose = require('mongoose');
const validator = require('validator');
const logger = require('../config/logger').logger;
var crypto = require('crypto');
const Schema = mongoose.Schema;

var validateUsername = function (username) {
    logger.info("--------------------------------------------------------");
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
    logger.info("--------------------------------------------------------");
    logger.info("Checking password...");
    if (!validator.isAlphanumeric(username)) {
        logger.info("Username validaton for isAlphanumeric passed, must contain at least one non-alphanumeric character");
        return true;
    } else {
        logger.error("Username validaton for isAlphanumeric did not pass");
        return false;
    }

}

var validateLocalStrategyEmail = function (email) {
    console.log(validator.isEmail(email));
    return (validator.isEmail(email));
};

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
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    salt: String

}, { collection: 'users2' });

UserSchema.pre('save', function (next) {
    console.log(this.password);
    if (this.password && this.isModified('password') && this.password.length >= 8) {
        this.salt = crypto.randomBytes(32).toString('base64');

        this.password = this.setPassword(this.password);

        next();

    }

});


UserSchema.methods.setPassword = function (password) {
    if (this.salt && password) {

        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    } else {

        return password;
    }
};

UserSchema.methods.validPassword = function (userPassword, hashPassword, s) {

    var salt = s;
    var hash = crypto.pbkdf2Sync(userPassword, new Buffer(salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    return hashPassword === hash;
};

const User = mongoose.model('User', UserSchema, 'users2');
module.exports = User;