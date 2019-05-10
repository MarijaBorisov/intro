var express = require('express');
var db = require('./database/db');

var app = express();

var UserRoutes = require('./routes/UserRoutes');
var BookRoutes = require('./routes/BookRoutes');
var AuthorRoutes = require('./routes/AuthorRoutes');


// user route when url matches /api/user/
app.use('/api/user/', UserRoutes);


// book routes
app.use('/api/books/', BookRoutes);


// book routes
app.use('/api/author/', AuthorRoutes);


module.exports = app;