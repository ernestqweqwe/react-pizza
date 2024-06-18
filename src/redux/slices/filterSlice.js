import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperety: 'rating',
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
  },
});
export const { setCategoryId, setSort, setDirection } = filterSlice.actions; //Методы filterSlice храняться в filterSlice.actions а не в filterSlice.reducers

export default filterSlice.reducer;