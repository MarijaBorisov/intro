const mongoose = require('mongoose');
const db_config = require('./config').db_config;
console.log(db_config.url);
const connection = mongoose.connect(db_config.url, { useNewUrlParser: true });

module.exports = {
    connection
}