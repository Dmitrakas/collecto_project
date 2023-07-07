import { createSlice } from '@reduxjs/toolkit';
import {createCollection} from '../../actions/collection'

export const collectionSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createCollection.fulfilled, (state, action) => {
      state.isLoading = false;
      state.collections = action.payload.data.collection;
    })
    .addCase(createCollection.pending, state => {
      state.isLoading = true;
    })
    .addCase(createCollection.rejected, (state) => {
      state.isLoading = false;
      state.collections = [];
    })
  },
});
