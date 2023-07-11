import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createItem = createAsyncThunk(
  'item/createItem',
  async (param) => {
    try {
      const response = await axios.post('http://localhost:5000/api/item/create', param);
      return response;
    } catch (error) {
      throw new Error('Failed to create item: ' + error.message);
    }
  }
);

export const getItems = async (collectionId) => {
  try {
    const response = await axios.get('http://localhost:5000/api/item/itemsByCollectionId', {
      params: {
        collectionId: collectionId
      }
    })
    return response.data.items;
  } catch (error) {
    return error.message;
  }
};