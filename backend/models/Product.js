const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  productDescription: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true
  },
  productUnit: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productWeight: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);