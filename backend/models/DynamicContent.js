const mongoose = require('mongoose');

const CustomFormFieldSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, default: 'text' },
}, { _id: false });

const DynamicContentSchema = new mongoose.Schema({
    page: { 
        type: String, 
        required: true, 
        enum:['Home', 'About', 'Volunteer', 'Team', 'Event', 'Service', 'Contact', 'Gallery', 'Donation Schema', 'Donation Schemes'] 
    },
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    date: { type: Date }, 
    role: { type: String },
    customForm: {
        title: String,
        fields: [CustomFormFieldSchema]
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DynamicContent', DynamicContentSchema);
