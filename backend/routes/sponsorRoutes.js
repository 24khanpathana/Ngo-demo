const express = require('express');
const router = express.Router();
const Sponsor = require('../models/Sponsor');
const { protect } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    try {
        const sponsors = await Sponsor.find().sort({ createdAt: -1 });
        res.json(sponsors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/', protect, async (req, res) => {
    try {
        const newSponsor = new Sponsor(req.body);
        await newSponsor.save();
        res.status(201).json(newSponsor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const updatedSponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSponsor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        await Sponsor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sponsor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
