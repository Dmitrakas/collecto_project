import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createComment = createAsyncThunk(
  'comment/createComment',
  async (commentData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/comment', commentData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create comment: ' + error.message);
    }
  }
);

export const getCommentsByItemId = async (itemId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/comment/${itemId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteCommentById = createAsyncThunk(
  'comment/deleteCommentById',
  async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/comment/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  });

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async ({ id, data }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/comment/${id}`, data);

      if (!response.data) {
        throw new Error('Empty response received');
      }

      return response.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw new Error('Failed to update comment: ' + error.message);
    }
  }
);

