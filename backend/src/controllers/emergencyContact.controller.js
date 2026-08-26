const { createEmergencyContact, getEmergencyContacts, updateEmergencyContact, deleteEmergencyContact } = require('../services/emergencyContact.service');

async function addEmergencyContact(req, res, next) {
    try {
        const emergencyContact = await createEmergencyContact(req.user.id, req.body);
        res.status(201).json({
            success: true,
            message: 'Emergency contact added successfully',
            data: {
                emergencyContact
            }
        });
    } catch (error) {
        return next(error);
    }
}

async function listEmergencyContacts(req, res, next) {
    try {
        const emergencyContacts = await getEmergencyContacts(req.user.id);
        res.status(200).json({
            success: true,
            message: 'Emergency contacts retrieved successfully',
            data: {
                emergencyContacts
            }   
        });
    } catch (error) {
        return next(error);
    }
}

async function updateContact(req, res, next) {
    try {
        const contact = await updateEmergencyContact(
            req.user.id,
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Emergency contact updated successfully",
            data: {
                contact
            }
        });
    } catch (error) {
        return next(error);
    }
}

async function deleteContact(req, res, next) {
    try {
        await deleteEmergencyContact(req.user.id, req.params.id);
        return res.status(200).json({
            success: true,
            message: "Emergency contact deleted successfully"
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    addEmergencyContact,
    listEmergencyContacts,
    updateContact,
    deleteContact
};