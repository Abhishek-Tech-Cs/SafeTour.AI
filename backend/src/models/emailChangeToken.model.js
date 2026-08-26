const mongoose = require('mongoose');

const emailChangeTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    newEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    tokenHash: {
        type: String,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true,
        index: true,
        expires: 0
    }
}, {
    timestamps: true
});

const EmailChangeToken = mongoose.model(
    'EmailChangeToken',
    emailChangeTokenSchema
);

module.exports = EmailChangeToken;