const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('winston');
const dotenv = require('dotenv');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const connection = require('./config/db').connection;
const sequelize = require('./config/dbMySql');

dotenv.config();
const app = express();




//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

sequelize.sync().then(result => {
    //console.log(result);
    app.listen(4000);
}).catch(err => {
    console.log(err);
})
module.exports = app;