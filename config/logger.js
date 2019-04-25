const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}][${info.level}] - ${info.message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: `${__dirname}/../logs/log-api.log`,

        }),
        new transports.File({
            level: 'error',
            filename: `${__dirname}/../logs/log-error.log`
        })
    ]
});

module.exports.logger = logger;