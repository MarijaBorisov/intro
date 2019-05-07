var express = require('express');
var logger = require('./utils/logs/winston');
var jwt = require('jsonwebtoken')
var crypto = require('crypto');
var mongooseConnect = require('./config/mongoDbConfig');

var userRoutes = require('./routes/usersRoute')
var employeeRoutes = require('./routes/employeesRoute')

var app = express();
app.use(express.json());

app.use('/', userRoutes);
app.use('/employees', employeeRoutes);





mongooseConnect((client) => {
})

// const password = '5757575';
// const key = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha512');
// console.log(key.toString('hex'));



// logger.info('da li radi')





module.exports = app;