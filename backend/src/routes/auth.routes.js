const express = require("express");
const validateRequest=require('../middleware/validateRequest.middleware')
const {registerValidation}=require('../validations/auth.validation')
const {register}=require('../controllers/auth.controller')

const router=express.Router();

router.post('/register', registerValidation, validateRequest, register);

module.exports=router