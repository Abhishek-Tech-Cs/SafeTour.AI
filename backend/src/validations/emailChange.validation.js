const { body, checkExact } = require('express-validator');

const requestEmailChangeValidation = [
    checkExact([
        body("newEmail")
            .trim()
            .notEmpty()
            .withMessage("New email is required")
            .bail()
            .isEmail()
            .withMessage("Please enter a valid email address")
            .normalizeEmail()
    ], {
        message: "Unexpected field"
    })
];

module.exports = {
    requestEmailChangeValidation
};