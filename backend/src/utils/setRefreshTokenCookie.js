const env = require('../config/env')

function setRefreshTokenCookie(res,refreshToken){
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: env.node_env === "production",
        sameSite: "lax",
        maxAge: env.refresh_token_expiry_days*24*60*60*1000, 
    })
}

module.exports = setRefreshTokenCookie