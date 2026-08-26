const mongoose = require('mongoose');

const mobileChangeTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        newMobileNumber: {
            type: String,
            required: true,
            trim: true
        },

        expiresAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

mobileChangeTokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

module.exports = mongoose.model(
    'MobileChangeToken',
    mobileChangeTokenSchema
);