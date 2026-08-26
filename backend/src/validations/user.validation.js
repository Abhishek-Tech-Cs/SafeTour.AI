const {body, checkExact} = require('express-validator');

const patchUserValidation = [
    checkExact([
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required")
            .bail()
            .isLength({min:3, max:50})
            .withMessage("Name must be between 3 and 50 characters")
            .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
            .withMessage("Name can only contain letters and spaces"),
    ],{
        message:"Unexpected field"
    })
]

const changePasswordValidation = [
    checkExact([
        body("currentPassword")
            .notEmpty()
            .withMessage("Current password is required"),

        body("newPassword")
            .notEmpty()
            .withMessage("New password is required")
            .bail()
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                minUppercase: 1
            })
            .withMessage(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
            )
    ], {
        message: "Unexpected field"
    })
];

module.exports={
    patchUserValidation,
    changePasswordValidation
}