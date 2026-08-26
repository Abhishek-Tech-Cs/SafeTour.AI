const {getProfile, updateProfile} = require('../services/user.service')
const { changePassword } = require('../services/password.service');
const { requestEmailChange } = require('../services/emailChange.service'); 

async function getUser(req,res,next){
    try{
        const user=await getProfile(req.user.id)
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: {
                user,
            },
        });
    }catch(error){
        return next(error)
    }
}

async function updateUser(req,res,next){
    try{
        const user=await updateProfile(req.user.id,req.body)
    
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                user,
            },
        });
    }catch(error){
        return next(error)
    }
}

async function changeUserPassword(req, res, next) {
    try {
        const { currentPassword, newPassword } = req.body;

        await changePassword(
            req.user.id,
            currentPassword,
            newPassword
        );

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        return next(error);
    }
}

async function requestChangeEmail(req, res, next) {
    try {
        await requestEmailChange(
            req.user.id,
            req.body.newEmail
        );

        return res.status(200).json({
            success: true,
            message: "Email change verification link sent successfully"
        });
    } catch (error) {
        return next(error);
    }
}

module.exports={
    getUser,
    updateUser,
    changeUserPassword,
    requestChangeEmail
}