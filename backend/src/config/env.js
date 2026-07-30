require('dotenv').config();

const env = {
    port:process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    cors_origin: process.env.CORS_ORIGIN,
    refresh_jwt_secret:process.env.REFRESH_JWT_SECRET,
    access_jwt_secret:process.env.ACCESS_JWT_SECRET,
    refresh_token_expiry:process.env.REFRESH_TOKEN_EXPIRY,
    access_token_expiry:process.env.ACCESS_TOKEN_EXPIRY,
    node_env:process.env.NODE_ENV
};

if (
    !env.port || !env.mongoURI || !env.cors_origin || !env.refresh_jwt_secret || !env.access_jwt_secret
    || !env.access_token_expiry || !env.refresh_token_expiry || !env.node_env
) {
    throw new Error('Missing required environment variables');
}
module.exports = env;