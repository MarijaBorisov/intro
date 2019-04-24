var express = require('express');
var app = express();

var db = require('./database/db');

var UserController = require('./model/UserController');
app.use('/users', UserController);

module.exports = app;