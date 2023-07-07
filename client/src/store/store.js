import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './reducers/userReducer';
import { collectionSlice } from './reducers/collectionReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  collection: collectionSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

