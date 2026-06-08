const axios = require('axios');

const sendEmail = async ({ to, subject, htmlContent }) => {
    try {
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { name: 'Pyaar Foundation', email: 'amaanp2710@gmail.com' },
                to: [{ email: to }],
                subject: subject,
                htmlContent: htmlContent,
            },
            {
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.BREVO_API_KEY,
                    'content-type': 'application/json'
                }
            }
        );
        console.log('Email sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error.response?.data || error.message);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
