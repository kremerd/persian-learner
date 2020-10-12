import { createSelector } from '@reduxjs/toolkit';
import { LearningUnit } from '../model/learningUnit';

const selectSlice = (state: any): LearningUnit[] => state.train;

export const selectFirstLearningUnit = createSelector(
  [selectSlice],
  train => train[0]
);

export default selectSlice;
