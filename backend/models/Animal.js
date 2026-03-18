const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    breed: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Animal', AnimalSchema);