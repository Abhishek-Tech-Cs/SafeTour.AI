const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    relationship: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    mobileNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid mobile number']
    },

    isPrimary: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

const EmergencyContact = mongoose.model(
    'EmergencyContact',
    emergencyContactSchema
);

module.exports = EmergencyContact;