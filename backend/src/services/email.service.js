const { Resend } = require('resend')
const env = require('../config/env')

const resendClient = new Resend(env.resend_api_key);

async function sendEmail({ to, subject, html }) {
    try {
        const { data, error } = await resendClient.emails.send({
            from: env.email_from,
            to,
            subject,
            html
        });

        if (error) {
            const err = new Error('Failed to send email');
            err.statusCode = 500;
            throw err;
        }

        return data;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }

        const err = new Error('Failed to send email');
        err.statusCode = 500;
        throw err;
    }
}

module.exports = {
    sendEmail
}
