import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  direction: 'asc',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setDirection(state, action) {
      state.direction = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.direction = action.payload.direction;
    },
  },
});

export const selectSort = (state) => state.filter.sort;

export const { setCategoryId, setSort, setDirection, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions; //Методы filterSlice храняться в filterSlice.actions а не в filterSlice.reducers

export default filterSlice.reducer;
