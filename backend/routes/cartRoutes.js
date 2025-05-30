const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Utility function to get cart by user or guest ID
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId: guestId });
    } 
    return null;
};

// @route   POST /api/cart
// @desc    Add a product to the cart for a guest or logged-in user
// @access  Public
router.post("/", async (req, res) => {
    let { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        // Validate and fetch product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Determine if user is logged in or guest
        let cart = await getCart(userId, guestId);

        // if cart exists, update it
        if (cart) {
            // Product exists in cart: update quantity
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
            // Product already in cart, update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Add new product to cart
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0]?.url,
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }

            // Recalculate totalPrice
            cart.totalPrice = cart.products.reduce(
                (sum, item) => sum + ((item.price) * (item.quantity)),
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create new cart for guest or user
            const newCart = await Cart.create({
                user: userId ? userId: undefined,
                guestId: guestId ? guestId: "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity
                    },
                ],
                totalPrice: product.price* quantity
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// @route   PUT /api/cart
// @desc    Update quantity of a product in the cart
// @access  Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {

        // Determine the cart
        let cart = await getCart(userId, guestId);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            if(quantity > 0){
                cart.products[productIndex].quantity = quantity;
            }
            else {
                // If quantity is 0, remove the product from the cart
                cart.products.splice(productIndex, 1);
            }
            cart.totalPrice = cart.products.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        }
        else{
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Error updating product quantity in cart:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


// @route DELETE /api/cart
// @desc  Remove a product from the cart
// access Public
router.delete("/",async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;

    try {
        // Determine the cart
        let cart = await getCart(userId, guestId);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            // Remove the product from the cart
            cart.products.splice(productIndex, 1);
            // Recalculate totalPrice
            cart.totalPrice = cart.products.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Error removing product from cart:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


// @route GET /api/cart
// @desc  Get cart details by userId or guestId
// @access Public
router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        // Check if either userId or guestId is provided
        if (!userId && !guestId) {
            return res.status(400).json({ message: "userId or guestId is required" });
        }

        // Fetch the cart
        const cart = await getCart(userId, guestId);

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


// @route POST /api/cart/merge
// @desc  Merge guest cart with user cart
// @access Private
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    try {
        // Fetch the user's cart and the guest's cart
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });
        
        if(guestCart) {
            if(guestCart.products.length === 0) {
                return res.status(400).json({message: "Guest cart is empty"});
            }

            if(userCart) {
                // Merge guest cart into user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                    (item) =>
                        item.productId.toString() === guestItem.productId.toString() &&
                        item.size === guestItem.size && 
                        item.color === guestItem.color
                    );

                    if (productIndex > -1) {
                        // If the items already exists in the user cart, update the quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    }else{
                        // Otherwise, add the new product to the user cart
                        userCart.products.push(guestItem);
                    }
                });

                userCart.totalPrice = userCart.products.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
                await userCart.save();

                // Remove the guest cart after merging
                try{
                    await Cart.findOneAndDelete({ guestId });
                }catch(error) {
                    console.error("Error deleting guest cart:", error);
                }
                res.status(200).json(userCart);
            } else{
                // If user cart does not exist, create a new one with guest cart products
                guestCart.user = req.user._id;
                guestCart.guestId = undefined; // Clear guestId
                await guestCart.save();

                res.status(200).json(guestCart);
            }
        }else{
            if(userCart) {
                // Guest cart has already been merged and return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({ message: "Guest cart not found" });
        }
    } catch (error) {
        console.error("Error merging carts:", error);
        res.status(500).json({ message: "Server error" });
    }
    
});

// ADD THIS for clearing the cart:
router.post("/clear", async (req, res) => {
    const { userId, guestId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(200).json({ products: [] });
        }
        cart.products = [];
        cart.totalPrice = 0;
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error("Error clearing cart:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
