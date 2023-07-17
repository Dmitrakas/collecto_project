import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createItem = createAsyncThunk(
  'item/createItem',
  async (param) => {
    try {
      const response = await axios.post('http://localhost:5000/api/item/create', param);
      return response.data;
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

export const getRecentItems = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/item/recent')
    return response.data.items;
  } catch (error) {
    return error.message;
  }
};


export const deleteItemById = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/item/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const updateItem = createAsyncThunk(
  'item/updateItem',
  async ({ id, data }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/item/update/${id}`, data);

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

export const getItemById = async (id) => {
  try {
    const response = await axios.get('http://localhost:5000/api/item/itemById', {
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
    const response = await axios.get('http://localhost:5000/api/item/topTags');
    return response.data.tags;
  } catch (error) {
    return error.message;
  }
};

