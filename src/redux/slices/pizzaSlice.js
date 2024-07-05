import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async ( params ) => {
  const { category, sortBy, order, search, currentPage } = params;
  const { data } = await axios.get(
    `https://661fa52416358961cd94ff2b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  console.log(data)
  return data;
});

const initialState = {
  items: [],
  status:'loading'  // loading | success | error 
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
       .addCase(fetchPizzas.pending, (state) => {
          state.status = "loading"
          state.items = []
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = "success"
       })
       .addCase(fetchPizzas.rejected, (state) => {
          state.status = "error"
          state.items = []
       })
 }
  
});
export const { setItems } = pizzaSlice.actions; //Методы filterSlice храняться в filterSlice.actions а не в filterSlice.reducers

export default pizzaSlice.reducer;
