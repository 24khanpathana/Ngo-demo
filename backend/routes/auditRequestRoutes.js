const express = require('express');
const router = express.Router();
const AuditDocumentRequest = require('../models/AuditDocumentRequest');
const { protect } = require('../middleware/authMiddleware');
const notifyAdmin = require('../utils/notifyAdmin');

const normalize = (value) => (value === null || value === undefined ? '' : String(value).trim());

router.post('/', async (req, res) => {
    try {
        const payload = {
            name: normalize(req.body.name),
            mobile: normalize(req.body.mobile),
            email: normalize(req.body.email),
            documentType: normalize(req.body.documentType),
            description: normalize(req.body.description),
        };

        if (!payload.name || !payload.mobile || !payload.email || !payload.documentType || !payload.description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (!/^\d{10,15}$/.test(payload.mobile)) {
            return res.status(400).json({ message: 'Enter a valid mobile number.' });
        }

        if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
            return res.status(400).json({ message: 'Enter a valid email address.' });
        }

        const request = new AuditDocumentRequest(payload);
        await request.save();

        const htmlContent = `
            <h2>New Audit Document Request</h2>
            <p><strong>Name:</strong> ${payload.name}</p>
            <p><strong>Mobile:</strong> ${payload.mobile}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Document Type:</strong> ${payload.documentType}</p>
            <p><strong>Description:</strong> ${payload.description}</p>
        `;

        const emailSent = await notifyAdmin({
            subject: 'New Audit Document Request',
            htmlContent,
        });

        res.status(201).json({ message: 'Request submitted successfully.', emailSent });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

router.get('/', protect, async (req, res) => {
    try {
        const requests = await AuditDocumentRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

router.patch('/:id', protect, async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await AuditDocumentRequest.findByIdAndUpdate(
            req.params.id,
            { status: normalize(status) || 'Pending' },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        await AuditDocumentRequest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Request deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

module.exports = router;
