var express = require('express');
var logger = require('./util/logger');
var path = require('path');
const rootDir = require('./util/path');
var connection = require('./util/database');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', adminRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use((req,res,next) => {
    res.status(404).send('Error');
});

module.exports = app;