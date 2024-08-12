const AppError = require('./AppError');

class ValidationError extends AppError {
    constructor(message) {
        super(message || 'Validation Error', 400);
    }
}

module.exports = ValidationError;
