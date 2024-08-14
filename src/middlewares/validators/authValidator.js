const { check } = require('express-validator');

const registerValidator = [
    check('fullName')
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2 }).withMessage('Full name must be at least 2 characters long'),
    check('email')
        .isEmail().withMessage('Please enter a valid email'),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
];

const loginValidator = [
    check('email')
        .isEmail().withMessage('Please enter a valid email'),
    check('password')
        .notEmpty().withMessage('Password is required')
];

module.exports = {
    registerValidator,
    loginValidator
};