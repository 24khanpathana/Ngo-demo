const sendEmail = require('./sendEmail');
const Setting = require('../models/Setting');

const cleanEmail = (value) => (value || '').trim().replace(/^['"]|['"]$/g, '');

const splitEmails = (value) => cleanEmail(value)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

const isEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

const getAdminRecipients = async () => {
    let settings = null;
    try {
        settings = await Setting.findOne().lean();
    } catch (error) {
        console.error('Could not load admin email settings:', error.message);
    }

    const settingsEmails = Array.isArray(settings?.otpEmails) ? settings.otpEmails : [];
    const recipients = [
        ...splitEmails(process.env.ADMIN_EMAIL),
        ...splitEmails(process.env.ADMIN_ID),
        ...settingsEmails.flatMap(splitEmails),
    ].filter(isEmail);

    return [...new Set(recipients)];
};

const notifyAdmin = async ({ subject, htmlContent }) => {
    try {
        const recipients = await getAdminRecipients();

        await sendEmail({
            to: recipients.length ? recipients : 'amaanp2710@gmail.com',
            subject,
            htmlContent,
        });
        return true;
    } catch (error) {
        console.error('Admin notification email failed:', error.message);
        return false;
    }
};

module.exports = notifyAdmin;
