import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer'; // Обратите внимание на импорт здесь
import collectionReducer from './reducers/collectionReducer';

const rootReducer = combineReducers({
  user: userReducer,
  collection: collectionReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

