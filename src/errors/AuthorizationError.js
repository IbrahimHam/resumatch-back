const AppError = require('./AppError');

class AuthorizationError extends AppError {
    constructor(message) {
        super(message || 'Authorization Error', 403);
    }
}

module.exports = AuthorizationError;
