const dotenv = require('dotenv');
dotenv.config();
const url = 'mongodb://' + process.env.USER + ':' + process.env.PASSWORD + '@' + process.env.HOST + ':' + process.env.DB_PORT + '/' + process.env.DB;

module.exports = {
    url
}