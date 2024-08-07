import { createSlice } from '@reduxjs/toolkit';

type CartItem = {
  id:string
  title:string
  price:number
  imageUrl:string
  type: number
  size: number
  count:number
};

interface CartSliceState {
  totalPrice: 0;
  items:CartItem[]
}

const initialState:CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
      } else {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItem(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id:string) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions; //Методы filterSlice храняться в filterSlice.actions а не в filterSlice.reducers

export default cartSlice.reducer;
