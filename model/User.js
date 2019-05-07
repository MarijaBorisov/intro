var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var validator = require('validator');
const logger = require('../logger');


var validateLocalStrategyPassword = function (password) {
    //console.log("validateLocalStrategyPassword: " + password);
    return (validator.isLength(password, 8));
};

var validateLocalStrategyEmail = function (email) {
    //console.log("email validator - evaluation: " + validator.isEmail(email));
    return (validator.isEmail(email));
};

var UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    salt: String

});

//hash the password
UserSchema.pre('save', function (next) {
    //console.log(" hash password - this.pass: " + this.password);
    if (this.password && this.isModified('password') && this.password.length >= 8) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.setPassword(this.password);
    }    

    next();
});



UserSchema.methods.setPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, Buffer.from(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    } else {
        //console.log("password from setPassword: " + password);
        return password;
    }
};


UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, Buffer.from(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    return this.password === hash;
};




/* my implementation below from medium tutorial that is not working correctly  */

// // method to set salt and hash the password for a user; setPassword method first creates a salt unique for every user 
// // then it hashes the salt with user password and creates a hash; this hash is stored in the database as user password
// UserSchema.methods.setPassword = function (password) {
//     // creating a unique salt for a particular user 
//     this.salt = crypto.randomBytes(16).toString('hex');

//     // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest 
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
//     console.log()
// };

// UserSchema.methods.validPassword = function (password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
//     return this.hash === hash;
// };



// mongoose.model('User', UserSchema);
// module.exports = mongoose.model('User');

module.exports = mongoose.model('User', UserSchema);