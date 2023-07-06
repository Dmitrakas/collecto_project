import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {userSlice} from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

