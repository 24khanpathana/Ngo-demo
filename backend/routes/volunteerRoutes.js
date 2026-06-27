const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const { protect } = require('../middleware/authMiddleware');
const notifyAdmin = require('../utils/notifyAdmin');

router.post('/apply', async (req, res) => {
    try {
        const newApp = new Volunteer(req.body);
        await newApp.save();

        const htmlContent = `
            <h2>New Volunteer Application</h2>
            <p><strong>Name:</strong> ${req.body.name}</p>
            <p><strong>Email:</strong> ${req.body.email}</p>
            <p><strong>Mobile:</strong> ${req.body.mobile}</p>
            <p><strong>Skills/Reason:</strong> ${req.body.skills}</p>
        `;
        
        const emailSent = await notifyAdmin({ 
            subject: 'New Volunteer Application', 
            htmlContent 
        });

        res.status(201).json({ message: 'Form submitted successfully', emailSent });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const apps = await Volunteer.find().sort({ date: -1 });
        res.json(apps);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   DELETE /api/volunteers/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        await Volunteer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Volunteer deleted successfully' });
    } catch (error) { 
        res.status(500).json({ message: 'Server error', error }); 
    }
});



module.exports = router;
