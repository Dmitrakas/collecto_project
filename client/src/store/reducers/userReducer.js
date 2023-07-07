import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../../actions/user'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isAuth: false,
    isLoading: false,
    token: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.data.user;
      state.isAuth = true;
      state.token = action.payload.data.token;
    })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = {};
      })

    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.currentUser = {};
      state.isAuth = false;
      state.token = '';
    })
  },
});
