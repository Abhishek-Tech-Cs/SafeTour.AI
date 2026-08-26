const TouristProfile = require('../models/touristProfile.model');

async function createTouristProfile(userId, profileData = {}, session) {
    const [profile] = await TouristProfile.create([{
        user: userId,
        ...profileData
    }], { session });
    
    return profile;
}

async function getTouristProfile(userId) {
    const profile = await TouristProfile.findOne({ user: userId });

    if(!profile) {
        const error = new Error('Tourist profile not found');
        error.statusCode = 404;
        throw error;
    }

    return profile;
}

async function updateTouristProfile(userId, profileData) {
    const profile = await TouristProfile.findOne({ user: userId });

    if(!profile) {
        const error = new Error('Tourist profile not found');
        error.statusCode = 404;
        throw error;
    }

    const { dateOfBirth, gender, nationality, profilePicture, travelPreferences } = profileData;

    if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;
    if (gender !== undefined) profile.gender = gender;
    if (nationality !== undefined) profile.nationality = nationality;
    if (profilePicture !== undefined) profile.profilePicture = profilePicture;
    if (travelPreferences !== undefined) profile.travelPreferences = travelPreferences;

    await profile.save();

    return profile;
}

module.exports = {
    createTouristProfile,
    getTouristProfile,
    updateTouristProfile
};