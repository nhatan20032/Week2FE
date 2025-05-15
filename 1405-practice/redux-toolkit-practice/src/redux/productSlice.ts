import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

const initialState: Product[] = [];

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct: Product = {
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
        price: action.payload.price,
      };
      const exist = state.some((p) => p.id === newProduct.id);
      if (exist) {
        alert("Sản phẩm đã trong giỏ");
        return;
      }
      state.push(newProduct);
    },
    deleteProduct: (state, action) => {
      return state.filter((p) => p.id !== action.payload.id);
    },
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
