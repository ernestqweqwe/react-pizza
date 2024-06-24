import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setSort(state, action) {
      state.sort = action.payload;
    },
    setDirection(state, action) {
      state.direction = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});
export const { setCategoryId, setSort, setDirection, setCurrentPage } = filterSlice.actions; //Методы filterSlice храняться в filterSlice.actions а не в filterSlice.reducers

export default filterSlice.reducer;
