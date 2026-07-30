const {registerUser}=require('../services/auth.service')
const setAuthCookie = require("../utils/setAuthCookie");

async function register(req,res,next){
    try{
        const {user, accessToken}=await registerUser(req.body);
        setAuthCookie(res,accessToken)
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user,
            },
        });
    }catch(error){
        return next(error)
    }
}

module.exports={
    register,
}