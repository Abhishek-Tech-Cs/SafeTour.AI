const { body, checkExact } = require('express-validator');

const updateTouristProfileValidation = [

    body().custom((value) => {
        if (!value || Object.keys(value).length === 0) {
            throw new Error("At least one field is required");
        }

        return true;
    }),

    checkExact([

        body("dateOfBirth")
            .optional()
            .isISO8601()
            .withMessage(
                "Date of birth must be a valid date in ISO 8601 format"
            )
            .bail()
            .custom((date) => {
                if (new Date(date) >= new Date()) {
                    throw new Error("Date of birth must be in the past");
                }

                return true;
            }),

        body("gender")
            .optional()
            .isIn(["Male", "Female", "Other"])
            .withMessage(
                "Gender must be one of: Male, Female, Other"
            ),

        body("nationality")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Nationality cannot be empty")
            .bail()
            .isLength({ min: 2, max: 50 })
            .withMessage(
                "Nationality must be between 2 and 50 characters"
            ),

        body("travelPreferences")
            .optional()
            .isArray()
            .withMessage(
                "Travel preferences must be an array"
            )
            .bail()
            .custom((preferences) => {
                if (!preferences.every(
                    preference =>
                        typeof preference === "string" &&
                        preference.trim().length > 0
                )) {
                    throw new Error(
                        "Travel preferences must contain only non-empty strings"
                    );
                }

                return true;
            })

    ], {
        message: "Unexpected field"
    })
];

module.exports = {
    updateTouristProfileValidation
};