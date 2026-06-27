const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { protect } = require('../middleware/authMiddleware');
const notifyAdmin = require('../utils/notifyAdmin');

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
        
        const emailSent = await notifyAdmin({ 
            subject: 'New Complaint Submission', 
            htmlContent 
        });

        res.status(201).json({ message: 'Form submitted successfully', emailSent });
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

// @route   DELETE /api/complaints/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.json({ message: 'Complaint deleted successfully' });
    } catch (error) { 
        res.status(500).json({ message: 'Server error', error }); 
    }
});

module.exports = router;
