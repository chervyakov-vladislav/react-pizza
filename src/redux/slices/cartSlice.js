import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
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
    minusProduct(state, action) {
      const findProduct = state.products.find((obj) => obj.id === action.payload.product.id);

      if (findProduct) {
        findProduct.count--;
      }

      if (findProduct.count === 0) {
        state.products = state.products.filter((product) => product.id !== action.payload.product.id);
      }
      state.totalPrice = state.products.reduce((sum, product) => sum + (product.price * product.count), 0);
    },
    removeProduct(state, action) {
      state.products = state.products.filter((product) => product.id !== action.payload.product.id);
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  }
});

export const selectCart = (state) => state.cart;
export const selectCartById = (id) => (state) => state.cart.products.find((obj) => obj.id === id);

export const { addProduct, removeProduct, clearCart, minusProduct } = cartSlice.actions;

export default cartSlice.reducer;
