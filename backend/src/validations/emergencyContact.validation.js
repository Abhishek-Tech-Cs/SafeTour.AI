const { body, checkExact } = require('express-validator');

const createEmergencyContactValidation = [

    checkExact([

        body("name")
            .trim()
            .notEmpty()
            .withMessage("Name is required")
            .bail()
            .isLength({ min: 3, max: 50 })
            .withMessage("Name must be between 3 and 50 characters")
            .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
            .withMessage("Name can only contain letters and spaces"),

        body("relationship")
            .trim()
            .notEmpty()
            .withMessage("Relationship is required")
            .bail()
            .isLength({ min: 2, max: 30 })
            .withMessage("Relationship must be between 2 and 30 characters"),

        body("mobileNumber")
            .trim()
            .notEmpty()
            .withMessage("Mobile number is required")
            .bail()
            .matches(/^[6-9]\d{9}$/)
            .withMessage("Please enter a valid mobile number"),

        body("isPrimary")
            .optional()
            .isBoolean()
            .withMessage("isPrimary must be a boolean")
            .toBoolean()

    ], {
        message: "Unexpected field"
    })
];

const updateEmergencyContactValidation = [

    body().custom((value) => {
        if (!value || Object.keys(value).length === 0) {
            throw new Error("At least one field is required for update");
        }
        return true;
    }),


    checkExact([
        body("name")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Name cannot be empty")
            .bail()
            .isLength({ min: 3, max: 50 })
            .withMessage("Name must be between 3 and 50 characters")
            .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
            .withMessage("Name can only contain letters and spaces"),

        body("relationship")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Relationship cannot be empty")
            .bail()
            .isLength({ min: 2, max: 30 })
            .withMessage(
                "Relationship must be between 2 and 30 characters"
            ),

        body("mobileNumber")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Mobile number cannot be empty")
            .bail()
            .matches(/^[6-9]\d{9}$/)
            .withMessage("Please enter a valid mobile number"),

        body("isPrimary")
            .optional()
            .isBoolean()
            .withMessage("isPrimary must be a boolean")
            .toBoolean()

    ], {
        message: "Unexpected field"
    })
];

module.exports = {
    createEmergencyContactValidation,
    updateEmergencyContactValidation
};