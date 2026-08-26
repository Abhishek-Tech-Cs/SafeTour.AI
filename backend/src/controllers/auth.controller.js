const { registerUser, loginUser } = require('../services/auth.service')
const setAuthCookie = require("../utils/setAuthCookie");
const setRefreshTokenCookie = require('../utils/setRefreshTokenCookie')
const env = require('../config/env');
const { refreshAccessToken, revokeRefreshTokenByRawToken } = require('../services/refreshToken.service');
const { verifyEmail, resendVerificationEmail } = require('../services/emailVerification.service');
const { forgotPassword, resetPassword } = require('../services/passwordReset.service');
const { verifyEmailChange } = require('../services/emailChange.service');
const { verifyMobile } = require('../services/mobileVerification.service');

async function register(req, res, next) {
    try {
        const { user, accessToken, refreshToken } = await registerUser(req.body);
        setAuthCookie(res, accessToken)
        setRefreshTokenCookie(res, refreshToken)
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        return next(error)
    }
}

async function login(req, res, next) {
    try {
        const { accessToken, refreshToken, user } = await loginUser(req.body)

        setAuthCookie(res, accessToken)
        setRefreshTokenCookie(res, refreshToken)

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

async function getMe(req, res, next) {
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: {
            user: req.user
        }
    })
}

async function logout(req, res, next) {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (refreshToken) {
            await revokeRefreshTokenByRawToken(refreshToken);
        }

        res.clearCookie("access_token", {
            httpOnly: true,
            secure: env.node_env === "production",
            sameSite: "lax",
        });

        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: env.node_env === "production",
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        return next(error);
    }
}

async function refresh(req, res, next) {
    try {
        const oldRefreshToken = req.cookies.refresh_token
        if (!oldRefreshToken) {
            const error = new Error("Unauthorized access");
            error.statusCode = 401;
            throw error;
        }
        const {accessToken, refreshToken} = await refreshAccessToken(oldRefreshToken)
        setAuthCookie(res, accessToken)
        setRefreshTokenCookie(res, refreshToken)    

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
        })
    } catch (error) {
        return next(error)
    }
}

async function verifyEmailController(req, res, next) {
    try {
        const { token } = req.body;

        if(!token) {
            const error = new Error("Verification token is required");
            error.statusCode = 400;
            throw error;
        }

        await verifyEmail(token);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        return next(error);
    }
}

async function resendVerification(req, res, next){
    try{
        const { email } = req.body
    
        if(!email){
            const error = new Error("Email is required")
            error.statusCode = 400;
            throw error
        }

        await resendVerificationEmail( email )

        return res.status(200).json({
            success: true,
            message:
                "If the email is registered and not verified, a verification email has been sent."
        });
    }catch(error){
        return next(error)
    }
}

async function forgotPasswordController(req, res, next) {
    try {
        const { email } = req.body;

        if(!email) {
            const error = new Error("Email is required");
            error.statusCode = 400;
            throw error;
        }

        await forgotPassword(email);

        return res.status(200).json({
            success: true,
            message: "If the email is registered, a password reset email has been sent."
        });
    } catch (error) {
        return next(error);
    }
}

async function resetPasswordController(req, res, next) {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            const error = new Error("Token and new password are required");
            error.statusCode = 400;
            throw error;
        }

        await resetPassword(token, newPassword);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        return next(error);
    }
}

async function verifyEmailChangeController(req, res, next) {
    try {
        const { token } = req.body;

        if (!token) {
            const error = new Error("Verification token is required");
            error.statusCode = 400;
            throw error;
        }

        await verifyEmailChange(token);

        return res.status(200).json({
            success: true,
            message: "Email changed successfully"
        });
    } catch (error) {
        return next(error);
    }
}

async function verifyMobileController(req, res, next) {
    try {
        const { accessToken } = req.body;

        const user = await verifyMobile(
            req.user.id,
            accessToken
        );

        return res.status(200).json({
            success: true,
            message: "Mobile number verified successfully",
            data: {
                mobileVerified: user.mobileVerified
            }
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    register,
    login,
    getMe,
    logout,
    refresh,
    verifyEmailController,
    resendVerification,
    forgotPasswordController,
    resetPasswordController,
    verifyEmailChangeController,
    verifyMobileController
}