import { createSlice } from '@reduxjs/toolkit';
import { createItem, updateItem, deleteItemById } from '../../actions/item';

export const itemSlice = createSlice({
  name: 'item',
  initialState: {
    items: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createItem.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItem.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItem.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteItemById.fulfilled, (state) => {
        state.isLoading = false;
      })
  },
});