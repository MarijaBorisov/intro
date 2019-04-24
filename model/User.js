var mongoose = require('mongoose');

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
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    }
    
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');