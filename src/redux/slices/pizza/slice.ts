import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, PizzaBlockInteface } from '../../../@types/types';
import { PizzaSliceState } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaSliceState = {
  pizzas: [],
  status: LoadingStatus.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<{ pizzas: PizzaBlockInteface[] }>) {
      state.pizzas = action.payload.pizzas;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzas = [];
      state.status = LoadingStatus.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = LoadingStatus.ERROR;
      state.pizzas = [];
    });
  }
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
