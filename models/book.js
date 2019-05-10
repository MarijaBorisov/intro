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
    qty: {
        type: Number
    },
    time: { type: Date, default: Date.now }

})

const Book = mongoose.model('bookStore3', BookSchema);
module.exports = Book;