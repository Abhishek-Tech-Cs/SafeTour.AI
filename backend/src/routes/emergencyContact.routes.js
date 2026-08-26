const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/auth.middleware');
const validateRequest = require('../middleware/validateRequest.middleware');
const { addEmergencyContact, listEmergencyContacts, updateContact, deleteContact } = require('../controllers/emergencyContact.controller');
const { createEmergencyContactValidation, updateEmergencyContactValidation }  = require('../validations/emergencyContact.validation');

// post 
router.post('/me/emergency-contacts', protectRoute, createEmergencyContactValidation, validateRequest, addEmergencyContact);

// get
router.get('/me/emergency-contacts', protectRoute, listEmergencyContacts);

// patch
router.patch('/me/emergency-contacts/:id', protectRoute, updateEmergencyContactValidation, validateRequest, updateContact);

// delete
router.delete('/me/emergency-contacts/:id', protectRoute, deleteContact);

module.exports = router;