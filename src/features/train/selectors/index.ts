import { createSelector } from '@reduxjs/toolkit';
import { LearningUnit } from '../model/learning-unit';

const selectSlice = (state: any): LearningUnit[] => state.train;

export const selectFirstLearningUnit = createSelector(
  [selectSlice],
  train => train[0]
);

export default selectSlice;
