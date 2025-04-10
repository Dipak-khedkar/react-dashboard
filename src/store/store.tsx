import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/slicer/productSlice";
import cartReducer from "../store/slicer/cartSlice";
import userReducer from "./slicer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "../store/slicer/authSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
