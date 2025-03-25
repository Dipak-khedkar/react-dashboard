import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://67d6bd11286fdac89bc2d4b0.mockapi.io/users"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async Thunk to add a user
export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://67d6bd11286fdac89bc2d4b0.mockapi.io/users",
        user
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async Thunk to update a user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://67d6bd11286fdac89bc2d4b0.mockapi.io/users/${user.id}`,
        user
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async Thunk to delete a user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://67d6bd11286fdac89bc2d4b0.mockapi.io/users/${userId}`
      );
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Initial state
const initialState = {
  users: [],
  loading: false, // track loading state for more precise control
  error: null, // track errors
};

// Users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index >= 0) {
          state.users[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
