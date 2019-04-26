const dotenv = require('dotenv');
dotenv.config();
const url = 'mongodb://' + process.env.USER + ':' + process.env.PASSWORD + '@' + process.env.HOST + ':' + process.env.DB_PORT + '/' + process.env.DB;
// const url = 'mongodb://' + process.env.USER + ':' + process.env.PASSWORD + '@127.0.0.1:27017/' + process.env.DB;

module.exports = {
    url
}