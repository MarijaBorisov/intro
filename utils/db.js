var mongoose = require('mongoose');
var db_url = require('../config/config');

mongoose.connect(db_url.url, {   
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});