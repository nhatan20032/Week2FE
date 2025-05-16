import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "~/types/Product";

const storedCart =
  typeof window !== "undefined" ? localStorage.getItem("cart") : null;
interface ProductState {
  product: Product | null;
  cart: Product[];
}

const initialState: ProductState = {
  product: null,
  cart: storedCart ? JSON.parse(storedCart) : [],
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
      const exist = state.cart.some((p) => p.id === action.payload.id);
      if (exist) {
        alert("Sản phẩm đã trong giỏ");
        return;
      }
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setProduct, addToCart, removeFromCart } = productSlice.actions;

export default productSlice.reducer;
