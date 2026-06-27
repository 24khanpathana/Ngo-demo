const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect } = require('../middleware/authMiddleware');
const notifyAdmin = require('../utils/notifyAdmin');

router.post('/', async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();

        const htmlContent = `
            <h2>New Feedback Received</h2>
            <p><strong>Name:</strong> ${req.body.name}</p>
            <p><strong>Email:</strong> ${req.body.email}</p>
            <p><strong>Feedback:</strong> ${req.body.feedback}</p>
        `;
        
        const emailSent = await notifyAdmin({ 
            subject: 'New Feedback Submission', 
            htmlContent 
        });

        res.status(201).json({ message: 'Form submitted successfully', emailSent });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ date: -1 });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   DELETE /api/feedback/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) { 
        res.status(500).json({ message: 'Server error', error }); 
    }
});



module.exports = router;
