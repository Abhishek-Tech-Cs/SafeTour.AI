const { body, checkExact } = require('express-validator');

const requestMobileChangeValidation = [

    body()
        .custom((value) => {
            if (!value || Object.keys(value).length === 0) {
                throw new Error("New mobile number is required");
            }

            return true;
        }),

    checkExact([
        body("newMobileNumber")
            .trim()
            .notEmpty()
            .withMessage("New mobile number is required")
            .bail()
            .matches(/^[6-9]\d{9}$/)
            .withMessage("Please enter a valid mobile number")
    ], {
        message: "Unexpected field"
    })
];

const verifyMobileChangeValidation = [

    body()
        .custom((value) => {
            if (!value || Object.keys(value).length === 0) {
                throw new Error("MSG91 access token is required");
            }

            return true;
        }),

    checkExact([
        body("msg91AccessToken")
            .trim()
            .notEmpty()
            .withMessage("MSG91 access token is required")
    ], {
        message: "Unexpected field"
    })
];

module.exports = {
    requestMobileChangeValidation,
    verifyMobileChangeValidation
};