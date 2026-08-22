const mongoose = require('mongoose');

const emailVerificationTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tokenHash:{
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true,
        expires: 0 
    }
},{
    timestamps: true
});

const EmailVerificationTokenModel = mongoose.model('EmailVerificationToken', emailVerificationTokenSchema);

module.exports = EmailVerificationTokenModel;