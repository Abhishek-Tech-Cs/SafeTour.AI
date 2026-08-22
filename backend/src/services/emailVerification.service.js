const env = require('../config/env');
const EmailVerificationTokenModel = require('../models/emailVerificationToken.model');
const User = require('../models/user.model');
const generateEmailVerificationToken = require('../utils/generateEmailVerificationToken');
const hashRandomToken = require('../utils/hashRandomToken');
const { sendEmail } = require('./email.service');

async function createEmailVerificationToken(userId) {
    const token = generateEmailVerificationToken();
    const tokenHash = hashRandomToken(token);
    const expiresAt = new Date(Date.now() + env.email_verification_token_expiry_minutes * 60 * 1000);

    await EmailVerificationTokenModel.create({
        user: userId,
        tokenHash,
        expiresAt
    });

    return token;
}

async function sendVerificationEmail(user, token) {
    const verificationUrl = `${env.frontend_url}/verify-email?token=${token}`;
    const subject = 'Verify Your Email Address';
    const html = `
        <p>Hello ${user.name},</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in ${env.email_verification_token_expiry_minutes} minutes.</p>
    `;
    await sendEmail({ to: user.email, subject, html });
}

async function verifyEmail(token) {
    const tokenHash = hashRandomToken(token);
    const emailVerificationToken = await EmailVerificationTokenModel.findOne({
        tokenHash,
        expiresAt: { $gt: new Date() }
    });

    if (!emailVerificationToken) {
        const error = new Error("Invalid or expired email verification token");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findById(emailVerificationToken.user);

    if(!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    user.isVerified = true;
    await user.save();
    await EmailVerificationTokenModel.deleteOne({ _id: emailVerificationToken._id });

    return user;
}

async function resendVerificationEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
        return;
    }

    if (user.isVerified) {
        return;
    }

    await EmailVerificationTokenModel.deleteMany({ user: user._id });

    const token = await createEmailVerificationToken(user._id);
    await sendVerificationEmail(user, token);
}

module.exports = {
    createEmailVerificationToken,
    sendVerificationEmail,
    verifyEmail,
    resendVerificationEmail
};