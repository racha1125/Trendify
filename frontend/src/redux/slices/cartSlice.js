import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper: Load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart || storedCart === "undefined") return { products: [] };
    try {
        return JSON.parse(storedCart);
    } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
        localStorage.removeItem("cart");
        return { products: [] };
    }
};

// Helper: Save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart items for a user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { params: { userId, guestId } }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching cart items:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { productId, quantity, size, color, guestId, userId }
            );
            return response.data;
        } catch (error) {
            console.error("Error adding item to cart:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { productId, quantity, size, color, guestId, userId }
            );
            return response.data;
        } catch (error) {
            console.error("Error updating cart item:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId, size, color, guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                { data: { productId, size, color, guestId, userId } }
            );
            return response.data;
        } catch (error) {
            console.error("Error removing item from cart:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Merge guest cart with user cart
export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({ guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
                { guestId, userId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error merging guest cart:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Clear everywhere
export const clearCartEverywhereThunk = createAsyncThunk(
    "cart/clearCartEverywhere",
    async ({ userId, guestId }) => {
        localStorage.setItem("cart", JSON.stringify({ products: [] }));
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/clear`,
                { userId, guestId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            );
        } catch (e) {
            console.error("Error clearing backend cart:", e);
        }
        return { products: [] };
    }
);

// NEW: thunk to reload cart from localStorage
export const fetchCartFromLocalStorage = () => (dispatch) => {
    const cart = loadCartFromStorage();
    dispatch(cartSlice.actions.setCart(cart));
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            state.loading = false;
            state.error = null;
            localStorage.setItem("cart", JSON.stringify({ products: [] }));
        },
        setCart: (state, action) => {
            state.cart = action.payload;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch cart items";
            })

            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add item to cart";
            })

            // Update item quantity
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update cart item";
            })

            // Remove from cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item from cart";
            })

            // Merge cart
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart";
            })

            // Clear cart everywhere
            .addCase(clearCartEverywhereThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCartEverywhereThunk.fulfilled, (state) => {
                state.loading = false;
                state.cart = { products: [] };
                localStorage.setItem("cart", JSON.stringify({ products: [] }));
            })
            .addCase(clearCartEverywhereThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to clear cart";
            });
    }
});

export const { clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;