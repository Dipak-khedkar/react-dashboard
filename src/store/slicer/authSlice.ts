import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: false,
  users: [],
  loader: false,
};

export const signupUser: any = createAsyncThunk(
  "auth/singupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://67e1b45d58cc6bf78526d6eb.mockapi.io/auth",
        userData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllUsers: any = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://67e1b45d58cc6bf78526d6eb.mockapi.io/auth"
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loader = false;
      console.log(action.payload);
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loader = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.loader = false;
    });
  },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
