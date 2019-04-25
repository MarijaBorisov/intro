var express = require('express');
var logger = require('./utils/logs/winston');
var jwt = require('jsonwebtoken')
var mongooseConnect = require('./config/mongoDbConfig');
var userController = require('./components/user/UserController');
var app = express();

app.use(express.json());
app.use('/', userController);


mongooseConnect((client) => {
})

logger.info('test2')





module.exports = app;