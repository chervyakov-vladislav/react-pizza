import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: SortInterface;
}

export interface SortInterface {
  name: string;
  sortProperty: string;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<{ categoryId: number }>) {
      state.categoryId = action.payload.categoryId;
    },
    setSearchValue(state, action: PayloadAction<{ searchValue: string }>) {
      state.searchValue = action.payload.searchValue;
    },
    setActiveSort(state, action: PayloadAction<{ sort: SortInterface }>) {
      state.sort = action.payload.sort;
    },
    setCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
      state.currentPage = action.payload.currentPage;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = action.payload.categoryId;
      state.currentPage = action.payload.currentPage;
      state.sort = action.payload.sort;
    }
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setActiveSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
