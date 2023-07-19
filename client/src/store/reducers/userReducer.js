import { createSlice } from '@reduxjs/toolkit';
import { login, logout, auth } from '../../actions/user'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isAuth: false,
    isLoading: false,
    token: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      state.isAuth = true;
    })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = {};
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = {};
        state.isAuth = false;
        state.token = '';
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.currentUser = action.payload.user;
      })
      .addCase(auth.rejected, (state, action) => {
        state.isLoading = true;
      })
  },
});
