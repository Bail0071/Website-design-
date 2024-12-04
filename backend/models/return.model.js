const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true,
        enum: ['wrong-size', 'defective', 'not-as-described', 'changed-mind', 'other']
    },
    details: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Return', returnSchema); 