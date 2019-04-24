const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/node-intro';

const mongooseConnect = () => {
    mongoose.connect(url, { useNewUrlParser: true }).then(res => {
        console.log('connected');
    })
        .catch(err => {
            console.log(err);
        })
}

module.exports = mongooseConnect;

