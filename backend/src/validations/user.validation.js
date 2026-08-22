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

module.exports={
    patchUserValidation
}