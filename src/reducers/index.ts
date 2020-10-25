import { combineReducers } from '@reduxjs/toolkit';
import lexicon from '../features/lexicon/slice';
import notification from '../features/notification/slice';
import trainer from '../features/trainer/slice';

const rootReducer = combineReducers({
  lexicon,
  notification,
  trainer
});

export default rootReducer;
