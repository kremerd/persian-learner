import { combineReducers } from "@reduxjs/toolkit";
import trainerReducer from './trainer/trainerSlice';

export default combineReducers({
  trainer: trainerReducer
});