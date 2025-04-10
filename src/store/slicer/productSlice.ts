import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API = "https://67d6bd11286fdac89bc2d4b0.mockapi.io/products";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  image: string;
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productsSlice.reducer;
