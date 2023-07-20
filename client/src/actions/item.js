import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createItem = createAsyncThunk(
  'item/createItem',
  async (param, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token;
      const response = await axios.post('https://collecto-app.onrender.com/api/item/create', param, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create item: ' + error.message);
    }
  }
);


export const deleteItemById = createAsyncThunk(
  'item/deleteItemById',
  async ({ id, userId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token;
      const response = await axios.delete(`https://collecto-app.onrender.com/api/item/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  });

export const updateItem = createAsyncThunk(
  'item/updateItem',
  async ({ id, userId, data }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token;
      const response = await axios.put(`https://collecto-app.onrender.com/api/item/update/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data) {
        throw new Error('Empty response received');
      }

      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw new Error('Failed to update item: ' + error.message);
    }
  }
);

export const getItems = async (collectionId) => {
  try {
    const response = await axios.get('https://collecto-app.onrender.com/api/item/itemsByCollectionId', {
      params: {
        collectionId: collectionId
      }
    })
    return response.data.items;
  } catch (error) {
    return error.message;
  }
};

export const getRecentItems = async () => {
  try {
    const response = await axios.get('https://collecto-app.onrender.com/api/item/recent')
    return response.data.items;
  } catch (error) {
    return error.message;
  }
};




export const getItemById = async (id) => {
  try {
    const response = await axios.get('https://collecto-app.onrender.com/api/item/itemById', {
      params: {
        id: id
      }
    });
    return response.data.item;
  } catch (error) {
    return error.message;
  }
};

export const getTopTags = async () => {
  try {
    const response = await axios.get('https://collecto-app.onrender.com/api/item/topTags');
    return response.data.tags;
  } catch (error) {
    return error.message;
  }
};

