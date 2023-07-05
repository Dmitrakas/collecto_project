import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registration = createAsyncThunk(
  'user/registration',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/registration', {
        username,
        email,
        password,
      });
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
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