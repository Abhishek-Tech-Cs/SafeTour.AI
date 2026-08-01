const jwt=require('jsonwebtoken')
const env=require('../config/env')
const User=require('../models/user.model')

async function protectRoute(req,res,next){
    try{
        const accessToken=req.cookies.access_token
        if(!accessToken){
            const error = new Error("Unauthorised access");
            error.statusCode = 401;
            throw error;
        }
        const decoded=jwt.verify(accessToken,env.access_jwt_secret)
        const user=await User.findById(decoded.id)

        if(!user){
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;    
        }

        req.user=user

        return next();

    }catch(error){
        return next(error)
    }
}

module.exports=protectRoute