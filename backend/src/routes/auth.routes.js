const express = require("express");
const validateRequest=require('../middleware/validateRequest.middleware')
const {registerValidation, loginValidation, resetPasswordValidation, forgotPasswordValidation}=require('../validations/auth.validation')
const {register, login, getMe, logout, refresh, verifyEmailController, resendVerification, forgotPasswordController, resetPasswordController}=require('../controllers/auth.controller')
const protectRoute=require('../middleware/auth.middleware')

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


//get
router.get('/me', protectRoute, getMe)

module.exports=router