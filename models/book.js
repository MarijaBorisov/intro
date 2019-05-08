const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    author: {
        type: String
    },
    price: {
        type: Number
    },

})

const Book = mongoose.model('bookStore', BookSchema);
module.exports = Book;