import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItem(state, action) {
      state.items = [];
    },
  },
});
export const { addItem, removeItem, clearItem } = cartSlice.actions; //Методы filterSlice храняться в filterSlice.actions а не в filterSlice.reducers

export default cartSlice.reducer;
