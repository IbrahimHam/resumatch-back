const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

// Define the log directory
const logDir = '/tmp/logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/app-%DATE%.log`, // log file will be created in logs folder with name app-<date>.log
    datePattern: 'YYYY-MM-DD', 
    maxFiles: '14d', // log files will be saved for 14 days
    zippedArchive: true,  
});


const logger = createLogger({
    format: format.combine(
        format.timestamp(),  
        format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`)  // log format
    ),
    transports: [
        dailyRotateFileTransport,  
    ]
});

logger.info = (message) => {
    logger.log({
        level: 'info',
        message
    });
};

logger.error = (err) => {
    logger.log({
        level: 'error',
        message: err.stack || err.message 
    });
};

module.exports = logger;
