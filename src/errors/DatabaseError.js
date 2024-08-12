const AppError = require('./AppError');

class DatabaseError extends AppError {
    constructor(message) {
        super(message || 'Database Error', 500);
    }
}

module.exports = DatabaseError;
