const {registerUser, loginUser}=require('../services/auth.service')
const setAuthCookie = require("../utils/setAuthCookie");
const env=require('../config/env')

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

async function login(req,res,next){
    try{
        const {accessToken,user}=await loginUser(req.body)

        setAuthCookie(res,accessToken)

        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:{
                user
            }
        })
    }catch(error){
        next(error)
    }
}

async function getMe(req,res,next){
    return res.status(200).json({
        success:true,
        message:"User fetched successfully",
        data:{
            user:req.user
        }
    })
}

async function logout(req,res,next){
    res.clearCookie('access_token',{
        httpOnly: true,
        secure: env.node_env === "production",
        sameSite: "lax",
    });

    return res.status(200).json({
        success:true,
        message:"user logout successfully",
    })
}

module.exports={
    register,
    login,
    getMe,
    logout,
}