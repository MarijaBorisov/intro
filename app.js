const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('winston');
const dotenv = require('dotenv');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const connection = require('./config/db').connection;
dotenv.config();
const app = express();



//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/books', booksRouter);
app.use('/users', usersRouter);

module.exports = app;