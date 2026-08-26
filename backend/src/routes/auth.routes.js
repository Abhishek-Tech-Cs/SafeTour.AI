const express = require("express");
const validateRequest=require('../middleware/validateRequest.middleware')
const {registerValidation, loginValidation, resetPasswordValidation, forgotPasswordValidation}=require('../validations/auth.validation')
const {register, login, getMe, logout, refresh, verifyEmailController, resendVerification, forgotPasswordController, resetPasswordController, verifyEmailChangeController}=require('../controllers/auth.controller')
const { verifyMobileController } = require('../controllers/auth.controller');
const protectRoute = require('../middleware/auth.middleware');
const { verifyMobileValidation } = require('../validations/mobileVerification.validation');


const router=express.Router();


//post
router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login)
router.post('/refresh', refresh)
router.post('/logout', logout)
router.post('/verify-email', verifyEmailController)
router.post('/resend-verification', resendVerification)
router.post('/forgot-password', forgotPasswordValidation, validateRequest, forgotPasswordController)
router.post('/reset-password', resetPasswordValidation, validateRequest, resetPasswordController)
router.post('/verify-email-change', verifyEmailChangeController)
router.post('/verify-mobile', protectRoute, verifyMobileValidation, validateRequest, verifyMobileController)

module.exports=router