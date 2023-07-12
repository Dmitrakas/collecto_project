import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createCollection = createAsyncThunk(
  'collection/createCollection',
  async (param) => {
    try {
      const {
        name,
        description,
        theme,
        image,
        itemFieldName1,
        itemFieldName2,
        itemFieldName3,
        itemFieldType1,
        itemFieldType2,
        itemFieldType3,
        userId,
      } = param;

      const response = await axios.post('http://localhost:5000/api/collection/create', {
        name,
        description,
        theme,
        image,
        itemFieldName1,
        itemFieldName2,
        itemFieldName3,
        itemFieldType1,
        itemFieldType2,
        itemFieldType3,
        userId,
      });

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);


export const getCollections = async (userId) => {
  try {
    const response = await axios.get('http://localhost:5000/api/collection/collections', {
      params: {
        userId: userId
      }
    })
    return response.data.collections;
  } catch (error) {
    return error.message;
  }
};

export const getAllCollections = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/collection/allCollections');
    return response.data.collections;
  } catch (error) {
    return error.message;
  }
};

export const getCollectionById = async (id) => {
  try {
    const response = await axios.get('http://localhost:5000/api/collection/collectionById', {
      params: {
        id: id
      }
    });
    return response.data.collection;
  } catch (error) {
    return error.message;
  }
};

export const deleteCollectionById = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/collection/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const updateCollection = createAsyncThunk(
  'collection/updateCollection',
  async ({ id, data }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/collection/update/${id}`, data);

      if (!response.data) {
        throw new Error('Empty response received');
      }

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
