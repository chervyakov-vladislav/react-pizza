import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { LoadingStatus, PizzaBlockInteface } from '../../@types/types';

export const fetchPizzas = createAsyncThunk<PizzaBlockInteface[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async ({ currentPage, category, sort, search }) => {
    const baseUrl = `https://642985ae5a40b82da4d4b14f.mockapi.io`;

    console.log(sort);

    const { data } = await axios
      .get<PizzaBlockInteface[]>(`${baseUrl}/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc${search}`);

    return data;
  }
)

export type SearchPizzaParams = {
  sort: string;
  category: string;
  search: string;
  currentPage: string;
};

interface PizzaSliceState {
  pizzas: PizzaBlockInteface[];
  status: LoadingStatus;
}

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

export const selectPizza = (state: RootState) => state.pizza;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
