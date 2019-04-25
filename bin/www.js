const app = require('../app');
//const http = require('http');
const dotenv = require('dotenv');
const port = require('./../config/config')
dotenv.config();



//const server = http.createServer(app);

app.listen(port.port);

