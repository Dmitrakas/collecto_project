import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import userReducer from './userReducer';
import collectionReducer from './collectionReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    collection: collectionReducer,
  },
  middleware: (getDefaultMiddleware) => [thunkMiddleware, ...getDefaultMiddleware()],
});

export default store;
