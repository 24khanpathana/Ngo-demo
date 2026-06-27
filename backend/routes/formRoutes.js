const express = require('express');
const router = express.Router();
const FormSubmission = require('../models/FormSubmission');
const notifyAdmin = require('../utils/notifyAdmin');

router.post('/submit', async (req, res) => {
    try {
        const { formId, formTitle, data } = req.body;
        const submission = new FormSubmission({ formId, formTitle, data });
        await submission.save();

        let fieldsHtml = '';
        for (const [key, value] of Object.entries(data)) {
            fieldsHtml += `<p><strong>${key}:</strong> ${value}</p>`;
        }

        const htmlContent = `<h2>New Submission: ${formTitle}</h2>${fieldsHtml}`;
        const emailSent = await notifyAdmin({ 
            subject: `New Submission - ${formTitle}`, 
            htmlContent 
        });

        res.status(201).json({ message: 'Form submitted successfully!', emailSent });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
