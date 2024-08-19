const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

function generateToken(payload) {
    return jwt.sign(payload, secret);
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = {
    generateToken,
    verifyToken,
};