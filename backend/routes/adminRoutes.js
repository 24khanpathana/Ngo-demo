const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Animal = require('../models/Animal');
const Sponsor = require('../models/Sponsor');
const DynamicContent = require('../models/DynamicContent');
const Volunteer = require('../models/Volunteer');
const Feedback = require('../models/Feedback');
const Complaint = require('../models/Complaint');
const FormSubmission = require('../models/FormSubmission');
const AuditDocumentRequest = require('../models/AuditDocumentRequest');

const escapeCsv = (value) => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value).replace(/"/g, '""');
    return /[",\n\r]/.test(stringValue) ? `"${stringValue}"` : stringValue;
};

const buildRows = (section, records, mapper) => {
    return records.map(record => ({ section, ...mapper(record) }));
};

router.get('/export-csv', protect, async (req, res) => {
    try {
        const [contents, animals, sponsors, volunteers, feedback, complaints, forms, auditRequests] = await Promise.all([
            DynamicContent.find().sort({ createdAt: -1 }).lean(),
            Animal.find().sort({ createdAt: -1 }).lean(),
            Sponsor.find().sort({ createdAt: -1 }).lean(),
            Volunteer.find().sort({ date: -1 }).lean(),
            Feedback.find().sort({ date: -1 }).lean(),
            Complaint.find().sort({ date: -1 }).lean(),
            FormSubmission.find().sort({ submittedAt: -1 }).lean(),
            AuditDocumentRequest.find().sort({ createdAt: -1 }).lean(),
        ]);

        const rows = [
            ...buildRows('Content', contents, item => ({
                name: item.title || '',
                email: '',
                mobile: '',
                status: '',
                title: item.title || '',
                description: item.description || '',
                imageUrl: item.imageUrl || '',
                page: item.page || '',
                role: item.role || '',
                date: item.date || '',
                organization: '',
                contact: '',
                link: '',
                amount: '',
                feedback: '',
                complaint: '',
                skills: '',
                formTitle: item.customForm?.title || '',
                documentType: '',
                submittedAt: item.createdAt || '',
            })),
            ...buildRows('Animals', animals, item => ({
                name: item.name || '',
                email: '',
                mobile: '',
                status: '',
                title: '',
                description: item.description || '',
                imageUrl: item.imageUrl || '',
                page: '',
                role: '',
                date: item.createdAt || '',
                organization: '',
                contact: '',
                link: '',
                amount: '',
                feedback: '',
                complaint: '',
                skills: '',
                formTitle: '',
                documentType: '',
                submittedAt: item.createdAt || '',
                age: item.age || '',
                breed: item.breed || '',
            })),
            ...buildRows('Sponsors', sponsors, item => ({
                name: item.name || '',
                email: '',
                mobile: '',
                status: '',
                title: '',
                description: item.description || '',
                imageUrl: item.imageUrl || '',
                page: '',
                role: '',
                date: item.createdAt || '',
                organization: item.organization || '',
                contact: item.contact || '',
                link: item.link || '',
                amount: '',
                feedback: '',
                complaint: '',
                skills: '',
                formTitle: '',
                documentType: '',
                submittedAt: item.createdAt || '',
            })),
            ...buildRows('Volunteers', volunteers, item => ({
                name: item.name || '',
                email: item.email || '',
                mobile: item.mobile || '',
                status: '',
                title: '',
                description: '',
                imageUrl: '',
                page: '',
                role: '',
                date: item.date || '',
                organization: '',
                contact: '',
                link: '',
                amount: '',
                feedback: '',
                complaint: '',
                skills: item.skills || '',
                formTitle: '',
                documentType: '',
                submittedAt: item.date || '',
            })),
            ...buildRows('Feedback', feedback, item => ({
                name: item.name || '',
                email: item.email || '',
                mobile: '',
                status: '',
                title: '',
                description: '',
                imageUrl: '',
                page: '',
                role: '',
                date: item.date || '',
                organization: '',
                contact: '',
                link: '',
                amount: '',
                feedback: item.feedback || '',
                complaint: '',
                skills: '',
                formTitle: '',
                documentType: '',
                submittedAt: item.date || '',
            })),
            ...buildRows('Complaints', complaints, item => ({
                name: item.name || '',
                email: item.email || '',
                mobile: '',
                status: '',
                title: '',
                description: '',
                imageUrl: '',
                page: '',
                role: '',
                date: item.date || '',
                organization: '',
                contact: '',
                link: '',
                amount: '',
                feedback: '',
                complaint: item.complaint || '',
                skills: '',
                formTitle: '',
                documentType: '',
                submittedAt: item.date || '',
            })),
            ...buildRows('FormSubmissions', forms, item => ({
                name: '',
                email: '',
                mobile: '',
                status: '',
                title: item.formTitle || '',
                description: '',
                imageUrl: '',
                page: '',
                role: '',
                date: '',
                organization: '',
                contact: '',
                link: '',
                amount: '',
                feedback: '',
                complaint: '',
                skills: '',
                formTitle: item.formTitle || '',
                documentType: '',
                submittedAt: item.submittedAt || '',
                details: JSON.stringify(item.data || {}),
            })),
            ...buildRows('AuditDocumentRequests', auditRequests, item => ({
                name: item.name || '',
                email: item.email || '',
                mobile: item.mobile || '',
                status: item.status || '',
                title: '',
                description: item.description || '',
                imageUrl: '',
                page: '',
                role: '',
                date: '',
                organization: '',
                contact: '',
                link: '',
                amount: '',
                feedback: '',
                complaint: '',
                skills: '',
                formTitle: '',
                documentType: item.documentType || '',
                submittedAt: item.createdAt || '',
            })),
        ];

        const columns = [
            'section', 'name', 'email', 'mobile', 'status', 'title', 'description', 'imageUrl', 'page', 'role', 'age', 'breed', 'organization', 'contact', 'link', 'amount', 'feedback', 'complaint', 'skills', 'formTitle', 'documentType', 'date', 'submittedAt', 'details'
        ];

        const csv = [
            columns.join(','),
            ...rows.map(row => columns.map(column => escapeCsv(row[column])).join(','))
        ].join('\n');

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename=admin-export.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

module.exports = router;
