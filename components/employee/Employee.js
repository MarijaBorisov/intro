var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String,
            //required: true
        },
        email: {
            type: String
        },
        department: {
            type: String
        },
        salary: {
            type: Number
        },
        dateOfBirth: {
            type: Date
        },
        companyStartDate: {
            type: Number
        },


    }
    , { timestamps: true }
)

mongoose.model('Employee', EmployeeSchema);

module.exports = mongoose.model('Employee');