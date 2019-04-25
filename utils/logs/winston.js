var winston = require('winston');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    //  new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: './logs/combined.log' }),
    new winston.transports.File({ filename: './utils/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './utils/logs/combined.log' }),

  ]
})



module.exports = logger;