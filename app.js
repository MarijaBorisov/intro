var express = require('express');
var mongooseConnect = require('./config/mongoDbConfig');
var userController = require('./components/user/UserController');
var app = express();

app.use(express.json());

app.use('/', userController);



mongooseConnect((client) => {

})


module.exports = app;