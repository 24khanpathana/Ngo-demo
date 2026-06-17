const mongoose = require('mongoose');

const AuditDocumentRequestSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    documentType: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AuditDocumentRequest', AuditDocumentRequestSchema);
