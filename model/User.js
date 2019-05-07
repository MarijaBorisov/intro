var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var validator = require('validator');
const logger = require('../logger');


var secretWord = process.env.SECRETWORD;


var validateLocalStrategyPassword = function (password) {
    //console.log("validateLocalStrategyPassword: " + password);
    return (validator.isLength(password, 8));
};

var validateLocalStrategyEmail = function (email) {
    //console.log("email validator - evaluation: " + validator.isEmail(email));
    return (validator.isEmail(email));
};


// CREATE A NEW MONGOOSE USER SCHEMA
// **
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


//HASH THE PASSWORD
// **
UserSchema.pre('save', function (next) {
    //console.log(" hash password - this.pass: " + this.password);
    if (this.password && this.isModified('password') && this.password.length >= 8) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.setPassword(this.password);
    }

    next();
});


// SET THE PASSWORD 
// **
UserSchema.methods.setPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, Buffer.from(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    } else {
        //console.log("password from setPassword: " + password);
        return password;
    }
};

// DOUBLE CHECK THE PASSWORD
// **
UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, Buffer.from(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    return this.password === hash;
};


// GENERATE JSON WEB TOKEN
// **
UserSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    expiry.setSeconds(expiry.getSeconds() + 30);
    console.log(expiry);
    return jwt.sign({
        _id: this._id,
        email: this.email,        
        exp: parseInt(expiry.getTime() / 1000),
    }, secretWord); // DO NOT KEEP YOUR SECRET IN THE CODE!    
};



// mongoose.model('User', UserSchema);
// module.exports = mongoose.model('User');


module.exports = mongoose.model('User', UserSchema);