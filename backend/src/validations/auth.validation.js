const {body}=require('express-validator')

const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .bail()
        .isLength({min:3, max:50})
        .withMessage("Name must be between 3 and 50 characters")
        .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
        .withMessage("Name can only contain letters and spaces"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),
    body("mobileNumber")
        .trim()
        .notEmpty()
        .withMessage("Mobile number is required")
        .bail()
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Please enter a valid mobile number"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isStrongPassword({
            minLength:8,
            minLowercase:1,
            minNumbers:1,
            minSymbols:1,
            minUppercase:1
        })
        .withMessage("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character")
];

module.exports={
    registerValidation,

}