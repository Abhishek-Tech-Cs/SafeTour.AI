const { getTouristProfile, updateTouristProfile } = require('../services/touristProfile.service');
const { updateProfilePicture } = require('../services/profilePicture.service');

async function getProfile(req, res, next) {
    try {
        const profile = await getTouristProfile(req.user.id);

        res.status(200).json({
            success: true,
            message: 'Tourist profile retrieved successfully',
            data: {
                profile
            }
        });

    } catch (error) {
        return next(error);
    }
}

async function updateProfile(req, res, next) {
    try {
        const profile = await updateTouristProfile(req.user.id, req.body);

        res.status(200).json({
            success: true,
            message: 'Tourist profile updated successfully',
            data: {
                profile
            }
        });
    } catch (error) {
        return next(error);
    }
}

async function updatePicture(req, res, next) {
    try {
        const profile = await updateProfilePicture(req.user.id, req.file);

        res.status(200).json({
            success: true,
            message: 'Profile picture updated successfully',
            data: {
                profile
            }
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getProfile,
    updateProfile,
    updatePicture
};