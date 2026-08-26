const TouristProfile = require('../models/touristProfile.model');
const {
    uploadImage,
    deleteImage
} = require('./image.service');

async function updateProfilePicture(userId, file) {
    if (!file) {
        const error = new Error("Profile picture is required");
        error.statusCode = 400;
        throw error;
    }

    const profile = await TouristProfile.findOne({
        user: userId
    });

    if (!profile) {
        const error = new Error("Tourist profile not found");
        error.statusCode = 404;
        throw error;
    }

    // Store ONLY the old fileId as a primitive value
    const oldFileId = profile.profilePicture?.fileId;

    const newImage = await uploadImage(file);

    try {
        profile.profilePicture = {
            url: newImage.url,
            fileId: newImage.fileId
        };

        await profile.save();

    } catch (error) {
        // MongoDB failed → delete newly uploaded image
        try {
            await deleteImage(newImage.fileId);
        } catch (cleanupError) {
            console.error(
                "Failed to cleanup new image:",
                cleanupError
            );
        }

        throw error;
    }

    // Only delete the OLD image
    if (oldFileId) {
        try {
            await deleteImage(oldFileId);
        } catch (error) {
            console.error(
                "Failed to delete old profile picture:",
                error
            );
        }
    }

    return profile;
}

module.exports = {
    updateProfilePicture
};