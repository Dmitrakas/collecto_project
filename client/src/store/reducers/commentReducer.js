import { createSlice } from '@reduxjs/toolkit';
import { createComment, updateComment, deleteCommentById } from '../../actions/comment';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.rejected, (state) => {
        state.isLoading = false;
        state.comments = [];
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
  },
});