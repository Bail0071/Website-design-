const router = require('express').Router();
const Return = require('../models/return.model');

// GET all returns
router.get('/', async (req, res) => {
    try {
        const returns = await Return.find().sort({ date: -1 });
        res.json(returns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new return request
router.post('/', async (req, res) => {
    const newReturn = new Return({
        orderNumber: req.body.orderNumber,
        productName: req.body.productName,
        reason: req.body.reason,
        details: req.body.details,
        status: 'pending',
        date: new Date()
    });

    try {
        const savedReturn = await newReturn.save();
        res.status(201).json(savedReturn);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH update return status
router.patch('/:id', async (req, res) => {
    try {
        const returnRequest = await Return.findById(req.params.id);
        if (!returnRequest) {
            return res.status(404).json({ message: 'Return request not found' });
        }

        if (req.body.status) {
            returnRequest.status = req.body.status;
        }

        const updatedReturn = await returnRequest.save();
        res.json(updatedReturn);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE return request
router.delete('/:id', async (req, res) => {
    try {
        const returnRequest = await Return.findById(req.params.id);
        if (!returnRequest) {
            return res.status(404).json({ message: 'Return request not found' });
        }

        await returnRequest.remove();
        res.json({ message: 'Return request deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 