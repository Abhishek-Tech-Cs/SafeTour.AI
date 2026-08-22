const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tokenHash: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true,
        expires: 0
    },
    revokedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema)

module.exports = RefreshToken