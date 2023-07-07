import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createItem = async (itemData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/item/create', itemData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create item: ' + error.message);
  }
};