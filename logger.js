const winston = require('winston');

module.exports = winston.createLogger({
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf(info => `[${info.timestamp}][${info.level}] - ${info.message}`)
    ),
  
    transports: [
        new winston.transports.File({
            filename: './loghistory/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: './loghistory/good.log'
        })
    ]
});
