const mongoose = require('mongoose');
const EmergencyContact = require('../models/emergencyContact.model');
const User = require('../models/user.model');

async function createEmergencyContact(userId, contactData) { 

    let {
        name,
        relationship,
        mobileNumber,
        isPrimary
    } = contactData;

    const isUserExists = await User.exists({ _id: userId });

    if (!isUserExists) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const existingPrimaryContact =
        await EmergencyContact.findOne({
            user: userId,
            isPrimary: true
        });

    if (!existingPrimaryContact) {
        isPrimary = true;
    } else if (isPrimary) {
        existingPrimaryContact.isPrimary = false;
        await existingPrimaryContact.save();
    }

    const emergencyContact =
        await EmergencyContact.create({
            user: userId,
            name,
            relationship,
            mobileNumber,
            isPrimary
        });

    return emergencyContact;
}

async function getEmergencyContacts(userId) {
    const isUserExists = await User.exists({ _id: userId });

    if (!isUserExists) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const emergencyContacts = await EmergencyContact.find({ user: userId });
    return emergencyContacts;
}

async function updateEmergencyContact(userId, contactId, contactData) {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        const error = new Error("Emergency contact not found");
        error.statusCode = 404;
        throw error;
    }

    const contact = await EmergencyContact.findOne({
        _id: contactId,
        user: userId
    });

    if (!contact) {
        const error = new Error("Emergency contact not found");
        error.statusCode = 404;
        throw error;
    }

    const {
        name,
        relationship,
        mobileNumber,
        isPrimary
    } = contactData;

    if (name !== undefined) {
        contact.name = name;
    }

    if (relationship !== undefined) {
        contact.relationship = relationship;
    }

    if (mobileNumber !== undefined) {
        contact.mobileNumber = mobileNumber;
    }

    if (isPrimary === true && !contact.isPrimary) {
        await EmergencyContact.updateMany(
            {
                user: userId,
                isPrimary: true,
                _id: { $ne: contactId }
            },
            {
                $set: { isPrimary: false }
            }
        );

        contact.isPrimary = true;
    }

    if (isPrimary === false && contact.isPrimary) {
        // Don't allow the current primary contact to simply become non-primary.
        // Another contact should be promoted first.
        const error = new Error(
            "Primary contact cannot be removed as primary"
        );
        error.statusCode = 400;
        throw error;
    }

    await contact.save();

    return contact;
}

async function deleteEmergencyContact(userId, contactId) {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        const error = new Error("Emergency contact not found");
        error.statusCode = 404;
        throw error;
    }

    const contact = await EmergencyContact.findOne({
        _id: contactId,
        user: userId
    });

    if (!contact) {
        const error = new Error("Emergency contact not found");
        error.statusCode = 404;
        throw error;
    }

    if(contact.isPrimary) {
        const nextPrimaryContact = await EmergencyContact.findOne({
            user: userId,
            _id: { $ne: contactId }
        }).sort({ createdAt: 1 });
        if (nextPrimaryContact) {
            nextPrimaryContact.isPrimary = true;
            await nextPrimaryContact.save();
        }
    }

    await contact.deleteOne();
}

module.exports = {
    createEmergencyContact,
    getEmergencyContacts,
    updateEmergencyContact,
    deleteEmergencyContact
};