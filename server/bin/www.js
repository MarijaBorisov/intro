//var http = require('http');
var app = require('../../app');
var server = require('../../config').server;
var logger = require('../../util/logger');

const port = (server.port || 3000);

//var server = http.createServer(app);
//server.listen(port);
app.listen(port, () => logger.info('Server running!'));