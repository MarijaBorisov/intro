var express = require('express');

var app = express();

var UserRoutes = require('./UserModel/UserRoutes');


// user route when url matches /api/user/
// **
app.use('/api/user/', UserRoutes);

module.exports = app;