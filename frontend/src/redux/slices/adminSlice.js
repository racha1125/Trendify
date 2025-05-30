import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
            headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        },
    );
    return response.data;
});

// Add the create user action
export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, {rejectWithValue}) => {
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
                userData,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}` },
                },
            );
            return response.data;
        }catch (error) {
            console.error("Error adding user:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to add user" });
        }
    }
);

// Update user details
export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async ({id, name, email, role}, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
                {name, email, role},
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}` },
                },
            );
            return response.data;
        } catch (error) {
            console.error("Error updating user:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to update user" });
        }
    }
);

// Delete a user
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}` },
                },
            );
            // Return deleted user's id for frontend removal
            return response.data;
        } catch (error) {
            console.error("Error deleting user:", error);
            return rejectWithValue(error.response?.data || { message: "Failed to delete user" });
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Fetch users
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch users";
        })

        // Add user
        .addCase(addUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.user) {
                state.users.push(action.payload.user);
            }
        })
        .addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.message) || "Failed to add user";
        })

        // Update user (Optimistic: update role immediately on pending)
        .addCase(updateUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            // Optimistic update: update role immediately
            const { id, role } = action.meta.arg;
            if (id && role) {
                const user = state.users.find(u => u._id === id);
                if (user) user.role = role;
            }
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            const updatedUser = action.payload;
            const userIndex = state.users.findIndex(user => user._id === updatedUser._id);
            if (userIndex !== -1) {
                state.users[userIndex] = updatedUser;
            }
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.message) || "Failed to update user";
        })

        // Delete user
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            const deletedUserId = action.payload;
            state.users = state.users.filter(user => user._id !== deletedUserId);
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload && action.payload.message) || "Failed to delete user";
        });
    }
});

export default adminSlice.reducer;