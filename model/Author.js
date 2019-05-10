var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var validator = require('validator');

const {BookSchema} = require('./Book');



var AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Author\'s name is required'],
        trim: true
    },
    birthYear: Number,
    books: Number,
    prizes: Number
});



module.exports = {
    AuthorModel : mongoose.model('Author', AuthorSchema),
    AuthorSchema : AuthorSchema
}