const winston = require('winston');
const { NODE_ENV } = process.env;

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ]
})

if(NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'info'
    }))
}
module.exports = logger;