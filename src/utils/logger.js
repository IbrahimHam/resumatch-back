const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs', 'app.log');

const logger = {
    info: (message) => {
        console.log(message);
        fs.appendFileSync(logFilePath, `[INFO] ${new Date().toISOString()} - ${message}\n`);
    },
    error: (err) => {
        console.error(err);
        fs.appendFileSync(logFilePath, `[ERROR] ${new Date().toISOString()} - ${err.stack || err.message}\n`);
    }
};

module.exports = logger;
