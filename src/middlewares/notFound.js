const NotFoundError = require('../errors/NotFoundError');

module.exports = (req, res, next) => {
    next(new NotFoundError(req.originalUrl));
};
