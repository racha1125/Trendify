const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/admin/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email'); // Populate user details
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route PUT /api/admin/orders/:id
// @desc  Update an order status (Admin only)
// @access Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status || order.status; // Update status if provided
        order.isDelivered = status === 'Delivered' ? true : order.isDelivered; // Set isDelivered if status is 'Delivered'
        order.deliveredAt = status === 'Delivered' ? Date.now() : order.deliveredAt; // Set deliveredAt if status is 'Delivered'
        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route DELETE /api/admin/orders/:id
// @desc  Delete an order (Admin only)
// // @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.deleteOne();
        res.json({ message: 'Order removed' });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;