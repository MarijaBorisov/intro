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
    },
    age: {
        type: Number,
        required: [true, 'Age field is required']
    },
    start: {
		type: Date,
		default: Date.now,
		required: 'Must have start date - default value is the created date'
    },
    end: {
		type: Date,
		default: new Date(+new Date() + 7*24*60*60*1000),
		required: 'Must have end date - default value is the created date + 1 week'
	}

},



{timestamps: true}

)

const Singer = mongoose.model('singer', SingerSchema);
module.exports = Singer;