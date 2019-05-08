const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var logger = require('../util/logger');

const Schema = mongoose.Schema;

var validatePassword = password => {
    if(validator.isLength(password, 10)){
        logger.info('Password is correct!')
        return true;

    }else{
        logger.error('Password is incorrect!')
        return false;
    }  
}
var validateEmail = email => {
    if(validator.isEmail(email)){
        logger.info('Email is correct!')
        return true;
    }else{
        logger.error('Email is incorrect!')
        return false;
    }
}
const userSchema = new Schema({
    
    name: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        default: '',
        validate: [validatePassword, 'Password is too short']
    },
    email: {
        type: String,
        unique: false,
        required: true,
        validate: [validateEmail, 'Fill valid email address']
    },
    salt: {
        type: String
    }
}, {collection: 'users3'});

userSchema.pre('save', function (next) {
    if (this.password && this.isModified('password') && this.password.length >= 8) {
      this.salt = crypto.randomBytes(16).toString('base64');
      this.password = this.setPassword(this.password);
    }
    next();
});

userSchema.methods.setPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    } else {
        return password;
    }
};

userSchema.statics.validPassword = function (password, hashpass, salt) {
    var hash = crypto.pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    return hashpass === hash;
};

const User = mongoose.model('user', userSchema, 'users3');
module.exports = User;