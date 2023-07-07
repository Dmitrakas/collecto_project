import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createCollection = createAsyncThunk(
  'user/createCollection',
  async (param) => {
    try {
      const { name, description, theme, image, userId } = param;
      const response = await axios.post('http://localhost:5000/api/collection', {
        name,
        description,
        theme,
        image,
        userId
      })
      return response;
    } catch (error) {
      return (error.message);
    }
  }
);

export const getCollections = async (userId) => {
  try {
    const response = await axios.get('http://localhost:5000/api/collection', {
      params: {
        userId: userId
      }
    })
    return response.data.collections;
  } catch (error) {
    return error.message;
  }
};