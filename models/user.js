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
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        validate: [validatePassword, 'Password is too short']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, 'Fill valid email address']
    },
    salt: {
        type: String
    }
}, {collection: 'users2'});

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

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    return this.password === hash;
};
userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  //console.log(expiry);
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, "ststststst");
};
  
const User = mongoose.model('user', userSchema, 'users2');
module.exports = User;