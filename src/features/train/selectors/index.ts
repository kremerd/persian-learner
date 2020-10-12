import { createSelector } from '@reduxjs/toolkit';
import { State } from '../slice';

const selectSlice = (state: any): State => state.train;

export const selectedDe = createSelector(
  [selectSlice],
  train => train.selectedDe
);

export default selectSlice;
