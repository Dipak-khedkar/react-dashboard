import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  name: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://67d6bd11286fdac89bc2d4b0.mockapi.io/users",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create user.");
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://67d6bd11286fdac89bc2d4b0.mockapi.io/users"
      );
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user.");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
