const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SingerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name field is required']
    },
    song: {
        type: String,
        required: [true, 'Song field is required']
    }
})

const Singer = mongoose.model('singer', SingerSchema);
module.exports = Singer;