import { createSlice } from '@reduxjs/toolkit';
import {login} from '../../actions/user'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isAuth: false,
    isLoading: false
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
  }
});

export default userSlice.reducer;


// setUser: (state, action) => {
//   state.currentUser = action.payload;
//   state.isAuth = true;
//   state.isLoading = true;
// },
//   logout: (state) => {
//     localStorage.removeItem('token');
//     state.currentUser = {};
//     state.isAuth = false;
//     state.isLoading = true;
//   }