const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    otpEmails: { type: [String], default: [] },
    isOtpEnabled: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);
