const express = require('express');
const Product = require('../models/Product');
const { protect, admin} = require('../middleware/authMiddleware');

const router = express.Router();

// @route POST /api/products
// @desc Create a new product
// @access Private (Admin)
router.post('/', protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountedPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            rating,
            numReviews,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;
        const product = new Product({
            name,
            description,
            price,
            discountedPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            rating,
            numReviews,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user.id // Assuming req.user is set by the protect middleware
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error){
        console.error(error);
        res.status(500).send('Server error');
    }
}); 

// @route PUT /api/products/:id
// @desc Update a existing product ID
// @access Private (Admin)
router.put("/:id", protect, admin, async (req, res) => {
    try{
        const {
            name,
            description,
            price,
            discountedPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            rating,
            numReviews,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;

        // Find the product by ID
        const product = await Product.findById(req.params.id);

        if (product) {
            // Update product fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountedPrice = discountedPrice || product.discountedPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.rating = rating || product.rating;
            product.numReviews = numReviews || product.numReviews;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;

            // Save the updated product
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else{
            res.status(404).json({ message: 'Product not found' });
        }
    }catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// @route Delete /api/products/:id
// @desc Delete a product by ID
// @access Private (Admin)
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            // Remove the product from the database
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public

module.exports = router;