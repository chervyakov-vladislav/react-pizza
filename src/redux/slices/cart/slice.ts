import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ItemType } from '../../../@types/types';
import { getCartFromLS } from './../../../utils/getCartFromLS';
import { CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<{ product: ItemType }>) {
      const findProduct = state.products.find((obj) => obj.id === action.payload.product.id);
      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push({
          ...action.payload.product,
          count: 1,
        });
      }

      state.totalPrice = state.products.reduce((sum, product) => sum + (product.price * product.count), 0);
    },
    minusProduct(state, action: PayloadAction<{ product: ItemType }>) {
      const findProduct = state.products.find((obj) => obj.id === action.payload.product.id);

      if (findProduct) {
        findProduct.count--;
      }

      if (findProduct && findProduct.count === 0) {
        state.products = state.products.filter((product) => product.id !== action.payload.product.id);
      }
      state.totalPrice = state.products.reduce((sum, product) => sum + (product.price * product.count), 0);
    },
    removeProduct(state, action: PayloadAction<{ product: ItemType }>) {
      state.products = state.products.filter((product) => product.id !== action.payload.product.id);
      state.totalPrice = state.products.reduce((sum, product) => sum + (product.price * product.count), 0);
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  }
});

export const { addProduct, removeProduct, clearCart, minusProduct } = cartSlice.actions;

export default cartSlice.reducer;
