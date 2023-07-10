import { createSlice } from '@reduxjs/toolkit';
import { createCollection } from '../../actions/collection'

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    collections: [],
    isLoading: false,
    collectionId: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createCollection.fulfilled, (state, action) => {
      state.isLoading = false;
      state.collections = action.payload.data;
      state.collectionId = action.payload.data._id;
    })
      .addCase(createCollection.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCollection.rejected, (state) => {
        state.isLoading = false;
        state.collections = [];
        state.collectionId = '';
      })
  },
});
