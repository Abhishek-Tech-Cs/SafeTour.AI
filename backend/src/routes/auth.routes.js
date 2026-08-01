const express = require("express");
const validateRequest=require('../middleware/validateRequest.middleware')
const {registerValidation, loginValidation}=require('../validations/auth.validation')
const {register, login, getMe, logout}=require('../controllers/auth.controller')
const protectRoute=require('../middleware/auth.middleware')

const router=express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login)
router.get('/me', protectRoute, getMe)
router.get('/logout', protectRoute, logout)

module.exports=router