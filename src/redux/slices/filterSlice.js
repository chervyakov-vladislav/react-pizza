import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload.categoryId;
    },
    setActiveSort(state, action) {
      state.sort = action.payload.sort;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload.currentPage;
    },
    setFilters(state, action) {
      state.categoryId = action.payload.categoryId;
      state.currentPage = action.payload.currentPage;
      state.sort = action.payload.sort;
    }
  },
});


export const { setCategoryId, setActiveSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
