const { validationResult } = require('express-validator');
const ValidationError = require('../errors/ValidationError');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ValidationError(errors.array().map(err => err.msg).join(', ')));
    }
    next();
};
