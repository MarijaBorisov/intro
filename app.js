var express = require('express');
var rp = require('request-promise');
var validator = require('validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var app = express();

var db = require('./database/db');
var UserController = require('./model/UserController');


// user route when url matches /api/user/
// **
app.use('/api/user/', UserController);

module.exports = app;