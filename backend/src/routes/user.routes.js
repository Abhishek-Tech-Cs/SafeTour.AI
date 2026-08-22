const express = require('express')

const {patchUserValidation} = require('../validations/user.validation');
const validateRequest = require('../middleware/validateRequest.middleware')
const {updateUser} = require('../controllers/user.controller')
const protectedRoute = require('../middleware/auth.middleware')

const router = express.Router();

router.patch('/me',protectedRoute, patchUserValidation, validateRequest, updateUser)

module.exports = router