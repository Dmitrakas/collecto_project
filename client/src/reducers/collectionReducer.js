import { createSlice } from '@reduxjs/toolkit';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {},
  reducers: {
  },
});

export const { actions } = collectionSlice;

export default collectionSlice.reducer;
