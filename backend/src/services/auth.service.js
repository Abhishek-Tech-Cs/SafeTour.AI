const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const generateAccessToken=require('../utils/generateAccessToken')

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

    const accessToken = generateAccessToken(user);

    return {
        user,
        accessToken,
    };
}

module.exports = {
    registerUser,
};