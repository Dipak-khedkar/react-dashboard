import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/slicer/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
