const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/donations
// @desc    Record a donation confirmation
// @access  Public
router.post('/', async (req, res) => {
    const { name, mobile, amount, paymentMethod, transactionRef, notes } = req.body;

    if (!name || !mobile || !amount || !transactionRef) {
        return res.status(400).json({ message: 'Name, mobile, amount, and transaction reference are required.' });
    }

    try {
        const newDonation = new Donation({
            name,
            mobile,
            amount,
            paymentMethod: paymentMethod || 'UPI QR',
            transactionRef,
            notes,
        });

        await newDonation.save();
        res.status(201).json({ message: 'Donation details recorded successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/donations
// @desc    Get all donation records
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
    try {
        const donations = await Donation.find().sort({ date: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   DELETE /api/donations/:id
// @desc    Delete a donation record
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        await Donation.findByIdAndDelete(req.params.id);
        res.json({ message: 'Donation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
