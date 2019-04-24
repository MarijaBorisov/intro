var express = require('express');

var app = express();


app.use(express.json());


app.use('/', function (req, res, next) {
    res.json('Hello')
});


module.exports = app;