const logger = require('../utils/logger');
const AppError = require('../errors/AppError');

module.exports = (err, req, res, next) => {
    if (!(err instanceof AppError)) {
        err = new AppError(err.message || 'Internal Server Error', err.statusCode || 500);
    }

    logger.error(err);

    if (process.env.NODE_ENV === 'production') {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.isOperational ? err.message : 'Something went wrong'
        });
    } else {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            stack: err.stack
        });
    }
};
