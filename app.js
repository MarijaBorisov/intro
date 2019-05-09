var express = require('express');
var app = express();
const morgan = require('morgan');
var db = require('./utils/db');
const sequelize = require('./utils/mysqldb');

var indexRouter = require('./routes/index');

app.use(express.json());
app.use('/', indexRouter);
app.use(morgan('combined'));

sequelize.sync().then(result => {
    app.listen(5000);
}).catch(err => {
    console.log(err);
})

module.exports = app;