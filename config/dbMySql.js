// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'node',
//     database: 'new_schema',
//     password: ''
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'pass1234', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;