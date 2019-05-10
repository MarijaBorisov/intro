var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var validator = require('validator');

//const {AuthorSchema} = require('./Author');



var BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        unique: [true, 'This title already exists'],
        trim: true
    },
    author: {
        type: String,
        trim: true
    },      
    pages: {
        type: Number,
        trim: true
    },
    genre: String,
    copies: Number  
});



module.exports = {
    BookModel : mongoose.model('Book', BookSchema),
    BookSchema : BookSchema
}