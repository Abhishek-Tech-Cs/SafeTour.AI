const {updateProfile} = require('../services/user.service')

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

module.exports={
    updateUser
}