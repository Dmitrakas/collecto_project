import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registration = async (username, email, password) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
      username,
      email,
      password
    })
    alert(response.data.message)
  } catch (e) {
    alert(e.response.data.message)
  }
}


export const login = createAsyncThunk(
  'user/loginUser',
  async ( param ) => {
    try {
      const {email, password} = param;
      console.log(`email: ${email}, password: ${password}`)
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      })
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response;
    } catch (error) {
      return (error.message);
    }
  }
);


export const auth = createAsyncThunk(
  'user/auth',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get('http://localhost:5000/api/auth/auth', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { user, token: newToken } = response.data;
      localStorage.setItem('token', newToken);
      return user;
    } catch (error) {
      localStorage.removeItem('token');
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);