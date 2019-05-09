const mongoose = require('mongoose');
const validator = require('validator');
const logger = require('../logger').logger;
const Schema = mongoose.Schema;



var validateUsername = function (username) {
    // logger.info("Checking username...");
    if (validator.isLowercase(username)) {
        // logger.info("Username validaton passed");
        return true;
    } else {
        // logger.error("Username validaton didnt pass");
        return false;
    }

}
var validatePassword = function (password) {
    // logger.info("Checking password...");
    if (!validator.isAlphanumeric(password)) {
        // logger.info("Password validaton passed");
        return true;
    } else {
        // logger.error("Password validaton didnt pass");
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
        required: true,
         },

})
UserSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    console.log(expiry);
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "wisegrid");
  };
  

const User = mongoose.model('user', UserSchema);
module.exports = User;