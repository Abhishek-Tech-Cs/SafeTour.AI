const mongoose = require('mongoose')

const passwordResetTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
},{
    timestamps: true
})

const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema)

module.exports = PasswordResetToken