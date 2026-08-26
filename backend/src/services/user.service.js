const User = require('../models/user.model')

async function getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("Unauthorized access")
        error.statusCode = 401;
        throw error;
    }
    return user;
}

async function updateProfile(userId, userData) {
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("Unauthorized access")
        error.statusCode = 401;
        throw error;
    }
    if (user.name === userData.name) {
        const error = new Error("Name must not be same");
        error.statusCode = 400;
        throw error;
    }
    user.name = userData.name
    await user.save()
    return user;
}

module.exports = {
    getProfile,
    updateProfile
}