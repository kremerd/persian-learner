import { createSelector } from '@reduxjs/toolkit';
import { getKey } from '../../../util/record';
import { selectLearningUnits } from '../../lexicon/selectors';
import { State } from '../slice';

const selectSlice = (state: any): State => state.trainer;
export default selectSlice;

export const selectTrainingUnit = createSelector([selectSlice, selectLearningUnits], ({ selectedIdDe }, units) => {
  return getKey(selectedIdDe, units);
});

export const selectTrainingProgress = createSelector([selectSlice], ({ selectedIdDe, progress }) => {
  const specProgress = getKey(selectedIdDe, progress);
  return specProgress ?? {
    lastCorrectDe: null,
    lastCorrectFaPh: null,
    scoreDe: 0,
    scoreFaPh: 0
  };
});
