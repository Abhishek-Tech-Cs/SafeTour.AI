const User = require("../models/user.model");
const generateAccessToken = require('../utils/generateAccessToken')
const {createRefreshToken} = require('../services/refreshToken.service')
const {createEmailVerificationToken, sendVerificationEmail} = require('./emailVerification.service')

async function registerUser(userData) {
    const { name, email, mobileNumber, password } = userData;

    const existingUser = await User.findOne({
        $or: [
            { email },
            { mobileNumber },
        ],
    }).select("email mobileNumber");

    if (existingUser) {
        if (existingUser.email === email) {
            throw new Error("Email is already registered");
        }

        if (existingUser.mobileNumber === mobileNumber) {
            throw new Error("Mobile number is already registered");
        }
    }

    const user = await User.create({
        name,
        email,
        mobileNumber,
        password,
    });
    try{
        const emailVerificationToken = await createEmailVerificationToken(user.id);
        await sendVerificationEmail(user, emailVerificationToken);
    }catch (error) {
        console.error("Failed to send verification email:", error);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await createRefreshToken(user.id)

    return {
        user,
        accessToken,
        refreshToken
    };
}

async function loginUser(userData){
    const {email,password}=userData

    const user=await User.findOne({
        email
    }).select("+password")

    if(!user){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid =await user.comparePassword(password)

    if(!isPasswordValid ){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = await createRefreshToken(user.id)

    const responseUser = user.toObject();
    delete responseUser.password;

    return {
        accessToken,
        refreshToken,
        user:responseUser
    }
}

module.exports = {
    registerUser,
    loginUser,
};