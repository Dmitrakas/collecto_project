import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './reducers/userReducer';
import { collectionSlice } from './reducers/collectionReducer';
import { itemSlice } from './reducers/itemReducer';
import { commentSlice } from './reducers/commentReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  collection: collectionSlice.reducer,
  item: itemSlice.reducer,
  comment: commentSlice.reducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

