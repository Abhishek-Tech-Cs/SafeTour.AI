const { body, checkExact } = require('express-validator');

const verifyMobileValidation = [

    checkExact([
        body("accessToken")
            .trim()
            .notEmpty()
            .withMessage("Access token is required")
    ], {
        message: "Unexpected field"
    })

];

module.exports = {
    verifyMobileValidation
};