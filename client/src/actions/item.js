import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createItem = createAsyncThunk(
  'user/createCollection',
  async (param) => {
    try {
      const response = await axios.post('http://localhost:5000/api/item/create', param);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create item: ' + error.message);
    }
  }
);