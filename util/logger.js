const {createLogger, format ,transports} = require('winston');

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf( info => `[${info.timestamp}][${info.level}] ${info.message}`)
    ),
    transports: [
        new transports.File({
            maxsize: 5555000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/allLogs.log`

        }),
        new transports.File({
            level:'error',
            maxsize: 5555000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/errors.log`

        }),
        new transports.Console({
            level: 'debug'
        })
    ]
})