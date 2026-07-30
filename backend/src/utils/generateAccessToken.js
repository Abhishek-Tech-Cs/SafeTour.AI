const jwt = require("jsonwebtoken");
const env = require("../config/env");

function generateAccessToken(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        env.access_jwt_secret,
        {
            expiresIn: env.access_token_expiry,
        }
    );
}

module.exports = generateAccessToken;       