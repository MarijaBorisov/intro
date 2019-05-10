var mongoose = require('mongoose');


var AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Author\'s name is required'],
        trim: true
    },
    birthYear: Number,
    books: Number,
    prizes: Number,
    date: Date
});


module.exports = {
    AuthorModel : mongoose.model('Author', AuthorSchema),
    AuthorSchema : AuthorSchema
}