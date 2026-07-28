require('dotenv').config();

const env = {
    port:process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    cors_origin: process.env.CORS_ORIGIN,
    // jwt_secret:process.env.JWT_SECRET
};

if (!env.port || !env.mongoURI || !env.cors_origin) {
    throw new Error('Missing required environment variables');
}
module.exports = env;