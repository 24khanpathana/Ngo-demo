const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const { protect } = require('../middleware/authMiddleware');

// Public route to get all animals
router.get('/', async (req, res) => {
    try {
        const animals = await Animal.find().sort({ createdAt: -1 });
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Protected routes for Admin
router.post('/', protect, async (req, res) => {
    try {
        const newAnimal = new Animal(req.body);
        await newAnimal.save();
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAnimal);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        await Animal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Animal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;