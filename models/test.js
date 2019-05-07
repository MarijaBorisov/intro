var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var validator = require('validator');

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function (password) {
  console.log(password);
  return (validator.isLength(password, 8));
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
  console.log(validator.isEmail(email));
  return (validator.isEmail(email));
};

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  name: {
    type: String,
    required: true,
    unique: true
  },

  salt: String,
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
}, { collection: 'users' });

/**
 * Hook a pre save method to hash the password
 */
userSchema.pre('save', function (next) {
  console.log(this.password);
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
    console.log(password);
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
  //expiry.setSeconds(expiry.getSeconds() + 30);
  console.log(expiry);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "wisegrid"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema, 'users');
// module.exports = User;
