const mongoose = require('mongoose');

const DynamicContentSchema = new mongoose.Schema({
    page: { 
        type: String, 
        required: true, 
        enum:['Home', 'About', 'Volunteer', 'Team', 'Event', 'Service', 'Contact', 'Gallery'] 
    },
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, default: '' },
    date: { type: Date }, 
    role: { type: String },
    customForm: {
        title: String,
        fields: [{ name: String, type: String }]
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DynamicContent', DynamicContentSchema);
