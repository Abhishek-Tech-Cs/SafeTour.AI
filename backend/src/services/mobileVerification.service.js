const env = require('../config/env');
const User = require('../models/user.model');

async function verifyMobileAccessToken(accessToken) {
    if (!accessToken) {
        const error = new Error("Access token is required");
        error.statusCode = 400;
        throw error;
    }

    const response = await fetch(
        'https://control.msg91.com/api/v5/widget/verifyAccessToken',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                authkey: env.msg91_auth_key,
                'access-token': accessToken
            })
        }
    );

    const data = await response.json();

    if (data?.type === 'error') {
        const error = new Error(
            data.message || "Mobile verification failed"
        );

        error.statusCode = 400;
        throw error;
    }

    return data;
}

async function verifyMobile(userId, accessToken) {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (user.mobileVerified) {
        const error = new Error("Mobile number is already verified");
        error.statusCode = 400;
        throw error;
    }

    const result = await verifyMobileAccessToken(accessToken);

    const verifiedMobile = result?.message;

    if (!verifiedMobile) {
        const error = new Error("Unable to retrieve verified mobile number");
        error.statusCode = 400;
        throw error;
    }

    const normalizedVerifiedMobile =
        verifiedMobile.replace(/^91/, '');

    const normalizedUserMobile =
        user.mobileNumber.replace(/^91/, '');

    if (normalizedVerifiedMobile !== normalizedUserMobile) {
        const error = new Error(
            "Verified mobile number does not match your account mobile number"
        );
        error.statusCode = 400;
        throw error;
    }

    user.mobileVerified = true;

    await user.save();

    return user;
}

module.exports = {
    verifyMobileAccessToken,
    verifyMobile
};