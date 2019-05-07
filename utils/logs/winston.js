var winston = require('winston');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat

  ),
  transports: [
    new transports.Console(),
    new winston.transports.File({ filename: './utils/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './utils/logs/combined.log' }),

  ]
})

module.exports = logger;