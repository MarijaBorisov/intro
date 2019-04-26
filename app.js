var express = require('express');
var app = express();
const morgan = require('morgan');
var db = require('./utils/db');

var indexRouter = require('./routes/index');

app.use(express.json());
app.use('/', indexRouter);
app.use(morgan('combined'));


module.exports = app;