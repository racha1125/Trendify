import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching all orders:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to fetch orders" });
        }
    }
);

// Update order delivery status
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error updating order status:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to update order status" });
        }
    }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
                }
            );
            // Return the deleted order's id for removal in the frontend
            return response.data;
        } catch (error) {
            console.error("Error deleting order:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to delete order" });
        }
    }
);

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All Orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
                // calculate total sales
                const totalSales = action.payload.reduce((sum, order) => {
                    return sum + order.totalPrice;
                }, 0);
                state.totalSales = totalSales;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload && action.payload.message) || "Failed to fetch orders";
            })

            // Update Order Status (Optimistic update for instant UI feedback)
            .addCase(updateOrderStatus.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                // Optimistically update order status in state
                const { id, status } = action.meta.arg;
                const order = state.orders.find(o => o._id === id);
                if (order) order.status = status;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload;
                const orderIndex = state.orders.findIndex(order => order._id === updatedOrder._id);
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = updatedOrder;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload && action.payload.message) || "Failed to update order status";
            })

            // Delete Order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                const deletedOrderId = action.payload;
                state.orders = state.orders.filter(order => order._id !== deletedOrderId);
                state.totalOrders = state.orders.length;
                // Recalculate total sales
                state.totalSales = state.orders.reduce((sum, order) => sum + order.totalPrice, 0);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload && action.payload.message) || "Failed to delete order";
            });
    },
});

export default adminOrderSlice.reducer;