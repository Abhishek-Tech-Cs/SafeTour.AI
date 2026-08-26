const User = require('../models/user.model');
const MobileChangeToken = require('../models/mobileChangeToken.model');
const { verifyMobileAccessToken } = require('./mobileVerification.service');

async function requestMobileChange(userId, newMobileNumber) {

    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (user.mobileNumber === newMobileNumber) {
        const error = new Error(
            "New mobile number must be different from current mobile number"
        );
        error.statusCode = 400;
        throw error;
    }

    const existingUser = await User.findOne({
        mobileNumber: newMobileNumber,
        _id: { $ne: userId }
    });

    if (existingUser) {
        const error = new Error(
            "Mobile number is already registered"
        );
        error.statusCode = 400;
        throw error;
    }

    await MobileChangeToken.deleteMany({
        user: userId
    });

    const expiresAt = new Date(
        Date.now() + 10 * 60 * 1000
    );

    const mobileChangeToken = await MobileChangeToken.create({
        user: userId,
        newMobileNumber,
        expiresAt
    });

    return mobileChangeToken;
}

async function verifyMobileChange(userId, msg91AccessToken) {

    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const pendingChange = await MobileChangeToken.findOne({
        user: userId,
        expiresAt: { $gt: new Date() }
    });

    if (!pendingChange) {
        const error = new Error(
            "No valid mobile number change request found"
        );
        error.statusCode = 400;
        throw error;
    }

    const result = await verifyMobileAccessToken(
        msg91AccessToken
    );

    const verifiedMobile = result?.message;

    if (!verifiedMobile) {
        const error = new Error(
            "Unable to retrieve verified mobile number"
        );
        error.statusCode = 400;
        throw error;
    }

    const normalizedVerifiedMobile =
        verifiedMobile.replace(/^91/, '');

    if (
        normalizedVerifiedMobile !==
        pendingChange.newMobileNumber
    ) {
        const error = new Error(
            "Verified mobile number does not match the requested mobile number"
        );
        error.statusCode = 400;
        throw error;
    }

    const existingUser = await User.findOne({
        mobileNumber: pendingChange.newMobileNumber,
        _id: { $ne: userId }
    });

    if (existingUser) {
        const error = new Error(
            "Mobile number is already registered"
        );
        error.statusCode = 400;
        throw error;
    }

    user.mobileNumber = pendingChange.newMobileNumber;
    user.mobileVerified = true;

    await user.save();

    await MobileChangeToken.deleteOne({
        _id: pendingChange._id
    });

    return user;
}

module.exports = {
    requestMobileChange,
    verifyMobileChange
};