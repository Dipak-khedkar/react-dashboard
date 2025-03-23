import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://67d6bd11286fdac89bc2d4b0.mockapi.io/users"
  );
  return response.data;
});

// Async Thunk to add a user
export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await axios.post(
    "https://67d6bd11286fdac89bc2d4b0.mockapi.io/users",
    user
  );
  return response.data;
});

// Async Thunk to update a user
export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  const response = await axios.put(
    `https://67d6bd11286fdac89bc2d4b0.mockapi.io/users/${user.id}`,
    user
  );
  return response.data;
});

// Async Thunk to delete a user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await axios.delete(
      `https://67d6bd11286fdac89bc2d4b0.mockapi.io/users/${userId}`
    );
    return userId;
  }
);

// Initial state
const initialState = {
  users: [],
  status: "idle",
  error: null,
};

// Users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index >= 0) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
