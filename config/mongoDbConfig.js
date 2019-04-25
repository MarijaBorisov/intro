const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const user = process.env.USER;
const password = process.env.PASSWORD;
//const url = 'mongodb://user:12345@127.0.0.1:27017/node-intro';

const url = 'mongodb://' + user + ':' + password + '@127.0.0.1:27017/node-intro';

const mongooseConnect = () => {
    mongoose.connect(url, { useNewUrlParser: true }).then(res => {
        console.log('connected');
    })
        .catch(err => {
            console.log(err);
        })
}

module.exports = mongooseConnect;

