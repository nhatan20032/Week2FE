import type { Product } from "../types/Product";
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_TO_CART,
  type AddAndRemoveProductType,
} from "./actionType";

export interface AddAndRemoveState {
  products: Product[];
}

const initialState: AddAndRemoveState = {
  products: [],
};

export const addOrRemoveReducer = (
  state: AddAndRemoveState = initialState,
  action: AddAndRemoveProductType
): AddAndRemoveState => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case REMOVE_PRODUCT_TO_CART:
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload.id),
      };
    default:
      return state;
  }
};
