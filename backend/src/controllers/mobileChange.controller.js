const {
    requestMobileChange,
    verifyMobileChange
} = require('../services/mobileChange.service');

async function requestMobileChangeController(req, res, next) {
    try {
        await requestMobileChange(
            req.user.id,
            req.body.newMobileNumber
        );

        return res.status(200).json({
            success: true,
            message: "Mobile number change requested successfully"
        });
    } catch (error) {
        return next(error);
    }
}

async function verifyMobileChangeController(req, res, next) {
    try {
        const user = await verifyMobileChange(
            req.user.id,
            req.body.msg91AccessToken
        );

        return res.status(200).json({
            success: true,
            message: "Mobile number changed successfully",
            data: {
                mobileNumber: user.mobileNumber,
                mobileVerified: user.mobileVerified
            }
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    requestMobileChangeController,
    verifyMobileChangeController
};