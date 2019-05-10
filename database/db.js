var mongoose = require('mongoose');
var db_url = require('../config');

mongoose.connect(db_url.mongodbUrl, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//console.log(mongoose.connection.readyState);
