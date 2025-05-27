const express = require('express');
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude password field
        res.json(users);
    } catch (error) {   
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route POST /api/admin/users/
// @desc  Create a new user (Admin only)
// @access Private/Admin
router.post('/', protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;

    try{

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({
            name,
            email,
            password, // Password should be hashed in the User model
            role: role || 'customer' // Default to 'customer' if no role is provided
        });

        await user.save();
        res.status(201).json({message: 'User created successfully',user});
    }catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route PUT /api/admin/users/:id
// @desc  Update a user Info (Admin only) - Name, Email, Role
// @access Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
        }
        const updatedUser = await user.save();
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route DELETE /api/admin/users/:id
// @desc  Delete a user (Admin only)
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne();
        res.json({ message: 'User removed successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;