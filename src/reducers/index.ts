import { combineReducers } from '@reduxjs/toolkit';
import train from '../features/train/slice';

const rootReducer = combineReducers({
  train
});

export default rootReducer;