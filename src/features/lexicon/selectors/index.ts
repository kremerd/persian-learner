import { createSelector } from '@reduxjs/toolkit';
import { State } from '../slice';

const selectSlice = (state: any): State => state.lexicon;
export default selectSlice;

export const selectLearningUnits = createSelector([selectSlice], ({ units }) => {
  return units;
});
