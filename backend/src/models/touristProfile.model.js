const mongoose = require('mongoose');

const touristProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: null
    },
    nationality: {
        type: String,
        default: null
    },
    profilePicture: {
        url: {
            type: String,
            default: null
        },
        fileId: {
            type: String,
            default: null
        }
    },
    travelPreferences: {
        type: [String],
        default: []
    }
},{
    timestamps: true
});

const TouristProfile = mongoose.model('TouristProfile', touristProfileSchema);
module.exports = TouristProfile;