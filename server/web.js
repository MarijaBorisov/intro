
var app = require('../app');
var http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
app.set('port', port);
console.log(`Your port is ${process.env.PORT}`); // 5000

var server = http.createServer(app);

server.listen(port);
server.on('error', () => {
    console.log("Non Listening")
});
server.on('listening', () => {
    console.log(" listening")
});


