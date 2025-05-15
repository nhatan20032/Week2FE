import type { Product } from "../types/Product";
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_TO_CART,
  type AddAndRemoveProductType,
} from "./actionType";

export const increase = (props: Product): AddAndRemoveProductType => ({
  type: ADD_PRODUCT_TO_CART,
  payload: props
});

export const remove = (props: Product): AddAndRemoveProductType => ({
  type: REMOVE_PRODUCT_TO_CART,
  payload: props
});
