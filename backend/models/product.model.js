const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    userName: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    reviews: [reviewSchema]
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product; 