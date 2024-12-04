const router = require('express').Router();
const Product = require('../models/product.model');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Add a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Add a review to a product
router.post('/:id/reviews', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.reviews.push(req.body);
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;