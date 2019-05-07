const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'node',
    database: 'new_schema',
    password: ''
});

module.exports = pool.promise();