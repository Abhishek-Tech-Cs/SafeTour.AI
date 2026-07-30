const env = require("../config/env");

function setAuthCookie(res, accessToken) {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: env.node_env === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
}

module.exports = setAuthCookie;