import { createSelector } from '@reduxjs/toolkit';
import { State } from '../slice';
import { getTrainingProgress } from '../slice/trainingProgress';

const selectSlice = (state: any): State => state.trainer;
export default selectSlice;

export const selectTrainingProgress = createSelector([selectSlice], ({ trainingProgress }) => trainingProgress);

export const selectCurrentTrainingUnit = createSelector([selectSlice],
  ({ currentTrainingUnit, trainingProgress }) => currentTrainingUnit !== null
    ? {
      ...currentTrainingUnit,
      score: getTrainingProgress(trainingProgress, currentTrainingUnit.id, currentTrainingUnit.trainer).score
    }
    : null
);
