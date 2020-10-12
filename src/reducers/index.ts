import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import train from '../features/train/slice';

const rootReducer = combineReducers({
  train
});

const persistedReducer = persistReducer({
  key: 'root',
  storage
}, rootReducer);

export default persistedReducer;