import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/slicer/usersSlice";
import productReducer from "../redux/slicer/productSlice";
import cartReducer from "../redux/slicer/cartSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
