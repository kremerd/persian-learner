import { combineReducers } from '@reduxjs/toolkit';
import lexicon from '../features/lexicon/slice';
import trainer from '../features/trainer/slice';

const rootReducer = combineReducers({
  lexicon,
  trainer
});

export default rootReducer;