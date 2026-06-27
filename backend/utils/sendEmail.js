const axios = require('axios');

const cleanEnv = (value) => (value || '').trim().replace(/^['"]|['"]$/g, '');

const parseEmailList = (value) => cleanEnv(value)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

const sendEmail = async ({ to, subject, htmlContent }) => {
    try {
        const apiKey = cleanEnv(process.env.BREVO_API_KEY);
        const recipients = Array.isArray(to)
            ? to.flatMap(parseEmailList)
            : parseEmailList(to);
        const senderEmail = cleanEnv(process.env.MAIL_SENDER_EMAIL)
            || cleanEnv(process.env.BREVO_SENDER_EMAIL)
            || cleanEnv(process.env.ADMIN_ID)
            || 'amaanp2710@gmail.com';

        if (!apiKey) {
            throw new Error('BREVO_API_KEY is not configured');
        }

        if (recipients.length === 0) {
            throw new Error('Email recipient is not configured');
        }

        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: {
                    name: process.env.MAIL_SENDER_NAME || 'Pyaar Foundation',
                    email: senderEmail,
                },
                to: recipients.map((email) => ({ email })),
                subject: subject,
                htmlContent: htmlContent,
            },
            {
                headers: {
                    'accept': 'application/json',
                    'api-key': apiKey,
                    'content-type': 'application/json'
                }
            }
        );
        console.log('Email sent successfully:', response.data);
        return response.data;
    } catch (error) {
        const providerError = error.response?.data || error.message;
        console.error('Error sending email:', providerError);
        throw new Error(
            typeof providerError === 'string'
                ? providerError
                : providerError.message || 'Email could not be sent'
        );
    }
};

module.exports = sendEmail;
