import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isAuth: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.currentUser = {};
      state.isAuth = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
