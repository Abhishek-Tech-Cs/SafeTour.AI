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
    password_reset_token_expiry_minutes:Number(process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN_MINUTES),
    imagekit_private_key:process.env.IMAGEKIT_PRIVATE_KEY,
    imagekit_public_key:process.env.IMAGEKIT_PUBLIC_KEY,
    imagekit_url_endpoint:process.env.IMAGEKIT_URL_ENDPOINT,
    email_change_token_expiry_minutes:Number(process.env.EMAIL_CHANGE_TOKEN_EXPIRES_IN_MINUTES),
    msg91_auth_key:process.env.MSG91_AUTH_KEY,
    msg91_widget_id:process.env.MSG91_WIDGET_ID,
    msg91_widget_token:process.env.MSG91_WIDGET_TOKEN
};

if (
    !env.port || !env.mongoURI || !env.cors_origin || !env.access_jwt_secret
    || !env.access_token_expiry || !env.refresh_token_expiry_days || !env.node_env || !env.email_verification_token_expiry_minutes || !env.resend_api_key || !env.email_from || !env.frontend_url || !env.password_reset_token_expiry_minutes
    || !env.imagekit_private_key || !env.imagekit_public_key || !env.imagekit_url_endpoint || !env.email_change_token_expiry_minutes || !env.msg91_auth_key || !env.msg91_widget_id || !env.msg91_widget_token
) {
    throw new Error('Missing required environment variables');
}
module.exports = env;       