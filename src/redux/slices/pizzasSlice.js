import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ currentPage, category, sort, search }) => {
    const baseUrl = `https://642985ae5a40b82da4d4b14f.mockapi.io`;

    const { data } = await axios
      .get(`${baseUrl}/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc${search}`);

    return data;
  }
)

const initialState = {
  pizzas: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload.pizzas;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzas = [];
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.pizzas = [];
    });
  }
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
