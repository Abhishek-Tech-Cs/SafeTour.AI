const express = require('express')
const upload = require('../middleware/upload.middleware')

const {patchUserValidation} = require('../validations/user.validation');
const validateRequest = require('../middleware/validateRequest.middleware')
const {getUser, updateUser} = require('../controllers/user.controller')
const protectedRoute = require('../middleware/auth.middleware')
const {changePasswordValidation} = require('../validations/user.validation')
const {changeUserPassword} = require('../controllers/user.controller')
const {getProfile, updateProfile} = require('../controllers/touristProfile.controller')
const {updateTouristProfileValidation} = require('../validations/touristProfile.validation')
const {updatePicture} = require('../controllers/touristProfile.controller')
const {requestChangeEmail} = require('../controllers/user.controller')
const {requestEmailChangeValidation} = require('../validations/emailChange.validation')
const {requestMobileChangeController, verifyMobileChangeController} = require('../controllers/mobileChange.controller')
const {requestMobileChangeValidation, verifyMobileChangeValidation} = require('../validations/mobileChange.validation')


const router = express.Router();

// get
router.get('/me', protectedRoute, getUser)
router.get('/me/profile', protectedRoute, getProfile)

// post
router.post('/me/change-mobile/verify', protectedRoute, verifyMobileChangeValidation, validateRequest, verifyMobileChangeController)

// patch
router.patch('/me', protectedRoute, patchUserValidation, validateRequest, updateUser)
router.patch('/change-password', protectedRoute, changePasswordValidation, validateRequest,     changeUserPassword)
router.patch('/me/profile', protectedRoute, updateTouristProfileValidation, validateRequest, updateProfile)
router.patch('/me/profile-picture', protectedRoute, upload.single('profilePicture'), updatePicture)
router.patch('/me/change-email', protectedRoute, requestEmailChangeValidation, validateRequest, requestChangeEmail)
router.patch('/me/change-mobile', protectedRoute, requestMobileChangeValidation, validateRequest, requestMobileChangeController)

module.exports = router