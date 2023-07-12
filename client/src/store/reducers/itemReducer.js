import { createSlice } from '@reduxjs/toolkit';
import { createItem, updateItem } from '../../actions/item';

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    items: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItem.rejected, (state) => {
        state.isLoading = false;
        state.items = [];
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItem.rejected, (state) => {
        state.isLoading = false;
      });
  },
});