var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    salt: String

}, { collection: 'users' })


UserSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.setPassword(this.password);
    }
    next();
});

UserSchema.methods.setPassword = function (password) {
    if (this.salt && password) {

        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    } else {
        console.log(password);
        return password;
    }
};

UserSchema.methods.validPassword = function (password) {
    console.log("this.password" + this.password);
    console.log("this.salt" + this.salt);
    var hash = crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    return this.password === hash;
};


mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');