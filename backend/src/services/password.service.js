const User = require("../models/user.model");
const { revokeAllRefreshTokens } = require("./refreshToken.service");

const SALT_ROUNDS = 12;

async function changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        const error = new Error("Current password is incorrect");
        error.statusCode = 400;
        throw error;
    }

    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
        const error = new Error("New password cannot be the same as the current password");
        error.statusCode = 400;
        throw error;
    }

    user.password = newPassword;
    await user.save();
    
    await revokeAllRefreshTokens(userId);
}

module.exports = {
    changePassword
};  