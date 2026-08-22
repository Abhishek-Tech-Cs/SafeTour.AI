const PasswordResetToken = require('../models/passwordResetToken.model');
const User = require('../models/user.model');
const generateRandomToken = require('../utils/generateRandomToken');
const hashRandomToken = require('../utils/hashRandomToken');
const { sendEmail } = require('./email.service');
const { revokeAllRefreshTokens } = require('./refreshToken.service');
const env = require('../config/env');

async function createPasswordResetToken(userId) {
    const token = generateRandomToken();
    const tokenHash = hashRandomToken(token);
    const expiresAt = new Date(Date.now() + env.password_reset_token_expiry_minutes * 60 * 1000);

    await PasswordResetToken.create({
        user: userId,
        tokenHash,
        expiresAt
    });

    return token;
}

async function sendPasswordResetEmail(user, token) {
    const resetUrl = `${env.frontend_url}/reset-password?token=${token}`;
    const subject = 'Reset Your Password';
    const html = `
        <p>Hello ${user.name},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in ${env.password_reset_token_expiry_minutes} minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
    `;
    await sendEmail({ to: user.email, subject, html });
}

async function forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
        return;
    }

    await PasswordResetToken.deleteMany({ user: user._id });

    const token = await createPasswordResetToken(user._id);
    await sendPasswordResetEmail(user, token);
}

async function resetPassword(token, newPassword) {
    const tokenHash = hashRandomToken(token);
    const passwordResetToken = await PasswordResetToken.findOne({
        tokenHash,
        expiresAt: { $gt: new Date() }
    });

    if (!passwordResetToken) {
        const error = new Error("Invalid or expired password reset token");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findById(passwordResetToken.user);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    user.password = newPassword;
    await user.save();

    await revokeAllRefreshTokens(user._id);
    await PasswordResetToken.deleteOne({ _id: passwordResetToken._id });
}

module.exports = {
    forgotPassword,
    resetPassword
};