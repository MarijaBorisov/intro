var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
    username: {
        type: String,

    },
    password: {
        type: String,
        //required: true
    },
    email: {
        type: String
    }
})

mongoose.model('Employee', EmployeeSchema);

module.exports = mongoose.model('Employee');