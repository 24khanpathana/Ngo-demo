const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'UPI QR' },
    transactionRef: { type: String, required: true },
    notes: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', DonationSchema);
