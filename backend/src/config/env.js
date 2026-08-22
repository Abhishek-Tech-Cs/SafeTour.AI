require('dotenv').config();

const env = {
    port:process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    cors_origin: process.env.CORS_ORIGIN,
    access_jwt_secret:process.env.ACCESS_JWT_SECRET,
    access_token_expiry:process.env.ACCESS_TOKEN_EXPIRY,
    node_env:process.env.NODE_ENV,
    refresh_token_expiry_days:Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS),
    email_verification_token_expiry_minutes:Number(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES),
    resend_api_key:process.env.RESEND_API_KEY,
    email_from:process.env.EMAIL_FROM,
    frontend_url:process.env.FRONTEND_URL,
    password_reset_token_expiry_minutes:Number(process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN_MINUTES)
};

if (
    !env.port || !env.mongoURI || !env.cors_origin || !env.access_jwt_secret
    || !env.access_token_expiry || !env.refresh_token_expiry_days || !env.node_env || !env.email_verification_token_expiry_minutes || !env.resend_api_key || !env.email_from || !env.frontend_url || !env.password_reset_token_expiry_minutes
) {
    throw new Error('Missing required environment variables');
}
module.exports = env;       