const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

var validatePassword = password => {
    if(validator.isLength(password, 22)){
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

const UserSchema = new Schema({
    
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
});



const User = mongoose.model('user', UserSchema);
module.exports = User;