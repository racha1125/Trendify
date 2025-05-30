const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/admin/products
router.get('/', protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/admin/products
router.post('/', protect, admin, async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            user: req.user.id
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/admin/products/:id
router.put('/:id', protect, admin, async (req, res) => {
    try {
        if (req.body.images && Array.isArray(req.body.images)) {
            req.body.images = req.body.images.map(img =>
                typeof img === "string"
                    ? { url: img, altText: "Product Image" }
                    : { url: img.url, altText: img.altText || "Product Image" }
            );
        }

        const product = await Product.findById(req.params.id);

        if (product) {
            Object.keys(req.body).forEach(key => {
                product[key] = req.body[key] !== undefined ? req.body[key] : product[key];
            });

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/admin/products/:id
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;