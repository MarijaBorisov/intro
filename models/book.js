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

})

const Book = mongoose.model('book', BookSchema);
module.exports = Book;