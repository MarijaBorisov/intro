var express = require('express');
var db = require('./database/db');

var app = express();

var UserRoutes = require('./model/UserRoutes');
var BookRoutes = require('./model/BookRoutes');
var AuthorRoutes = require('./model/AuthorRoutes');


// user route when url matches /api/user/
app.use('/api/user/', UserRoutes);


// book routes
app.use('/api/books/', BookRoutes);


// book routes
app.use('/api/author/', AuthorRoutes);


module.exports = app;