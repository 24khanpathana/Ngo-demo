const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    organization: { type: String, default: '' },
    contact: { type: String, default: '' },
    link: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sponsor', SponsorSchema);
