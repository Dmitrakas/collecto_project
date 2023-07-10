import { createSlice } from '@reduxjs/toolkit';
import { createItem } from '../../actions/item'

export const collectionSlice = createSlice({
  name: 'item',
  initialState: {
    items: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload.data;
    })
      .addCase(createItem.pending, state => {
        state.isLoading = true;
      })
      .addCase(createItem.rejected, (state) => {
        state.isLoading = false;
        state.items = [];
      })
  },
});
