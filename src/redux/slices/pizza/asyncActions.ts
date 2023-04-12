import { createAsyncThunk } from '@reduxjs/toolkit';
import { PizzaBlockInteface } from '../../../@types/types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<PizzaBlockInteface[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async ({ currentPage, category, sort, search }) => {
    const baseUrl = `https://642985ae5a40b82da4d4b14f.mockapi.io`;

    const { data } = await axios
      .get<PizzaBlockInteface[]>(`${baseUrl}/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc${search}`);

    return data;
  }
);
