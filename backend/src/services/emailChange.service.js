const EmailChangeToken = require('../models/emailChangeToken.model');
const User = require('../models/user.model');
const generateRandomToken = require('../utils/generateRandomToken');
const hashRandomToken = require('../utils/hashRandomToken');
const { sendEmail } = require('./email.service');
const env = require('../config/env');
const {revokeAllRefreshTokens} = require('./refreshToken.service');

async function createEmailChangeToken(userId, newEmail) {
    const token = generateRandomToken();
    const tokenHash = hashRandomToken(token);

    const expiresAt = new Date(
        Date.now() +
        env.email_change_token_expiry_minutes * 60 * 1000
    );

    await EmailChangeToken.create({
        user: userId,
        newEmail,
        tokenHash,
        expiresAt
    });

    return token;
}

async function sendEmailChangeVerification(user, newEmail, token) {
    const verificationUrl =
        `${env.frontend_url}/verify-email-change?token=${token}`;

    const subject = 'Verify Your New Email Address';

    const html = `
        <p>Hello ${user.name},</p>
        <p>You requested to change your email address to:</p>
        <p><strong>${newEmail}</strong></p>
        <p>Please verify your new email address by clicking the link below:</p>
        <a href="${verificationUrl}">Verify New Email</a>
        <p>
            This link will expire in
            ${env.email_change_token_expiry_minutes} minutes.
        </p>
        <p>If you did not request this change, please ignore this email.</p>
    `;

    await sendEmail({
        to: newEmail,
        subject,
        html
    });
}

async function requestEmailChange(userId, newEmail) {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (user.email === newEmail) {
        const error = new Error(
            "New email must be different from current email"
        );
        error.statusCode = 400;
        throw error;
    }

    const existingUser = await User.findOne({
        email: newEmail,
        _id: { $ne: userId }
    });

    if (existingUser) {
        const error = new Error("Email is already registered");
        error.statusCode = 400;
        throw error;
    }

    await EmailChangeToken.deleteMany({
        user: userId
    });

    const token = await createEmailChangeToken(
        userId,
        newEmail
    );

    await sendEmailChangeVerification(
        user,
        newEmail,
        token
    );
}

async function verifyEmailChange(token) {
    const tokenHash = hashRandomToken(token);

    const emailChangeToken = await EmailChangeToken.findOne({
        tokenHash,
        expiresAt: { $gt: new Date() }
    });

    if (!emailChangeToken) {
        const error = new Error("Invalid or expired email change token");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findById(emailChangeToken.user);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const existingUser = await User.findOne({
        email: emailChangeToken.newEmail,
        _id: { $ne: user._id }
    });

    if (existingUser) {
        const error = new Error("Email is already registered");
        error.statusCode = 400;
        throw error;
    }

    user.email = emailChangeToken.newEmail;
    user.isVerified = true;

    await user.save();

    await EmailChangeToken.deleteOne({
        _id: emailChangeToken._id
    });

    await revokeAllRefreshTokens(user._id);
}

module.exports = {
    createEmailChangeToken,
    sendEmailChangeVerification,
    requestEmailChange,
    verifyEmailChange
};