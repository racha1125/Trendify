const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Create JWT Payload
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Sign JWT and respond
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err;

                res.status(201).json({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                });
            }
        );
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Server error");
    }
});

// @route   POST /api/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT Payload
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Sign JWT and respond
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err;

                res.json({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                });
            }
        );
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Server error");
    }
});

// @route   GET /api/users/profile
// @desc    Get user profile (protected route)
// // @access  Private
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});
module.exports = router;
