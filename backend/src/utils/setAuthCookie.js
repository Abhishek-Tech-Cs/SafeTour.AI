const env = require("../config/env");

function setAuthCookie(res, accessToken) {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: env.node_env === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 min
    });
}

module.exports = setAuthCookie;