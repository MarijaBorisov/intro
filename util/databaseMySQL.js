const mysql = require('mysql2');
var database_mysql = require('../config').database_mysql;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop',
    password: ''

    //host: database_mysql.host,
    //user: database_mysql.user,
    //database: database_mysql.name,
    //password: database_mysql.password

});

module.exports = pool.promise();