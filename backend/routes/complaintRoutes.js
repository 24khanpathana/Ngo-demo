const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { protect } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
    try {
        const newComplaint = new Complaint(req.body);
        await newComplaint.save();

        const htmlContent = `
            <h2>New Complaint Received</h2>
            <p><strong>Name:</strong> ${req.body.name}</p>
            <p><strong>Email:</strong> ${req.body.email}</p>
            <p><strong>Complaint:</strong> ${req.body.complaint}</p>
        `;
        
        await sendEmail({ 
            to: process.env.ADMIN_EMAIL || 'amaanp2710@gmail.com', 
            subject: 'New Complaint Submission', 
            htmlContent 
        });

        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ date: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;