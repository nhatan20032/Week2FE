import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "~/types/Product";

interface ProductState {
  product: Product | null;
  cart: Product[];
}

const initialState: ProductState = {
  product: null,
  cart: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      if (state.product != null) state.product = null;
      state.product = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setProduct, addToCart, removeFromCart } = productSlice.actions;

export default productSlice.reducer;
