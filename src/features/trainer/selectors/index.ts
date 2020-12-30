import { createSelector } from '@reduxjs/toolkit';
import { State } from '../slice';
import { getTrainingProgress } from '../slice/trainingProgress';

const selectSlice = (state: any): State => state.trainer;
export default selectSlice;

export const selectProgress = createSelector([selectSlice], ({ progress }) => progress);

export const selectCurrentTrainingUnit = createSelector([selectSlice],
  ({ currentTrainingUnit, progress }) => currentTrainingUnit !== null
    ? {
      ...currentTrainingUnit,
      score: getTrainingProgress(progress, currentTrainingUnit.id, currentTrainingUnit.trainer).score
    }
    : null
);
