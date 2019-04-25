const dotenv = require('dotenv');

dotenv.config();

const username = process.env.USER;
const password = process.env.PASS;
const database = process.env.DB;


var mongodbUrl = `mongodb://${username}:${password}@127.0.0.1:27017/${database}`;

module.exports = {
    mongodbUrl
}