import { combineReducers } from '@reduxjs/toolkit';
import lexicon from '../features/lexicon/slice';
import train from '../features/train/slice';

const rootReducer = combineReducers({
  lexicon,
  train
});

export default rootReducer;