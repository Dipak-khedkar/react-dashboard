import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const calculateTotalPrice = (state: CartState) => {
  return state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
