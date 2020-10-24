import { createSelector } from '@reduxjs/toolkit';
import { selectLearningUnits } from '../../lexicon/selectors';
import { State } from '../slice';

const selectSlice = (state: any): State => state.train;
export default selectSlice;

export const selectTrainingUnit = createSelector([selectSlice, selectLearningUnits], ({ selectedIdDe }, units) => {
  const selected = units.find(unit => unit.id === selectedIdDe);
  return selected ?? null;
});

export const selectTrainingProgress = createSelector([selectSlice], ({ selectedIdDe, progress }) => {
  const specProgress = progress[selectedIdDe ?? -1];
  return specProgress ?? {
    lastCorrectDe: null,
    lastCorrectFaPh: null,
    scoreDe: 0,
    scoreFaPh: 0
  };
});
