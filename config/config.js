const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 4000;
const url = 'mongodb://' + process.env.USER + ':' + process.env.PASSWORD + '@' + process.env.HOST + ':' + process.env.DB_PORT + '/' + process.env.DB;


const db_config = {
    url
}
module.exports.db_config = db_config;
module.exports.port = port;
