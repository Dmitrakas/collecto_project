import { createSlice } from '@reduxjs/toolkit';
import { createCollection, updateCollection, deleteCollectionById } from '../../actions/collection';

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    collections: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
      })
      .addCase(createCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollection.rejected, (state) => {
        state.isLoading = false;
        state.collections = [];
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
      })
      .addCase(updateCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollection.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCollectionById.fulfilled, (state) => {
        state.isLoading = true;
      })
  },
});
