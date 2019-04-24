var app = require('./app');
var http = require('http');

var port = process.env.PORT || 3030;

var server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log(`NodeJS server started on port ${port}`);
    res.end();
  }).listen(port);