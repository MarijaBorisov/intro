var express = require('express');
var app = express();

var db = require('./database/db');

var rp = require('request-promise');
var validator = require('validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserController = require('./model/UserController');


app.use('/', UserController);

module.exports = app;