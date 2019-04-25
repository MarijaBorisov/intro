var mongoose = require('mongoose');
var crypto = require('crypto');

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
        trim: true
    },
    // password: {
    //     type: String,
    //     required: [true, 'Password is required'],
    //     trim: true
    // },
    hash: String,
    salt: String

});

// method to set salt and hash the password for a user; setPassword method first creates a salt unique for every user 
// then it hashes the salt with user password and creates a hash; this hash is stored in the database as user password
UserSchema.methods.setPassword = (password) => {
    // creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');

    // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest 
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};


UserSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
};



mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');