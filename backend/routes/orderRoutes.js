const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc  Get all orders for the logged-in user
// @access Private
router.get('/my-orders', protect, async (req, res) => {
    try{
        // Find orders for the logged-in user
        const orders = await Order.find({user: req.user}).sort({
            createdAt: -1,
        });// Sort by most recent orders first
        res.json(orders);
    }catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/orders/:id
// @desc vGet order details by ID
// @access Private
router.get('/:id', protect, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Return the full order details
        res.json(order);
    }catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;