const winston = require("winston");
const dayjs = require("dayjs");

const {combine, timestamp, printf} = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

const logger = winston.createLogger({
    level: "info",
    format: combine(
        timestamp({
        format: () => dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")
    }),
        logFormat
    ),
    transports: [
        new winston.transports.File({
            filename: "logs/app.log"
        })
    ]
});

module.exports = logger;