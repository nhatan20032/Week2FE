import type { Product } from "../types/Product";

export const ADD_PRODUCT_TO_CART = "INCREASE";
export const REMOVE_PRODUCT_TO_CART = "REMOVE";

export type AddAndRemoveProductType =
  | { type: typeof ADD_PRODUCT_TO_CART; payload: Product }
  | { type: typeof REMOVE_PRODUCT_TO_CART; payload: Product };
