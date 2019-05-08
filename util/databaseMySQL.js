//const mysql = require('mysql2');
var database_mysql = require('../config').database_mysql;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop', 'root', '', {dialect:'mysql', host: 'localhost'});
//const sequelize = new Sequelize(database_mysql.name, database_mysql.user, database_mysql.password, {dialect:'mysql', host: database_mysql.host});

module.exports = sequelize;


/*
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
*/