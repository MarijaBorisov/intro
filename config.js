const dotenv = require('dotenv').config();

var host = process.env.HOST;
var port = process.env.PORT;
var username = process.env.DB_USER;
var password = process.env.DB_PASSWORD;
var name = process.env.DB;
var server_port = process.env.SERVER_PORT;

var host2 = process.env.MYSQL_HOST;
var username2 = process.env.MYSQL_USERNAME;
var password2 = process.env.MYSQL_PASSWORD;
var name2 = process.env.MYSQL_DB;

module.exports = {
    database:{
        host: host,
        port: port,
        user: username,
        password: password,
        name: name
    },
    server:{
        port: server_port
    },
    database_mysql:{
        host: host2,
        user: username2,
        password: password2,
        name: name2
    }
}