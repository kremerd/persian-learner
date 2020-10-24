import { createSelector } from '@reduxjs/toolkit';
import { getKey } from '../../../util/record';
import { selectLearningUnitRecord } from '../../lexicon/selectors';
import { State } from '../slice';

const selectSlice = (state: any): State => state.trainer;
export default selectSlice;

export const selectCurrentLanguage = createSelector([selectSlice], ({ trainingUnit }) => trainingUnit?.lang ?? null);

export const selectCurrentLearningUnit = createSelector([selectSlice, selectLearningUnitRecord],
  ({ trainingUnit }, units) => getKey(trainingUnit?.id, units)
);

export const selectCurrentTrainingProgress = createSelector([selectSlice],
  ({ trainingUnit, trainingProgress }) => {
    const progress = getKey(trainingUnit?.id, trainingProgress);
    return progress ?? {
      lastCorrectDe: null,
      lastCorrectFa: null,
      scoreDe: 0,
      scoreFa: 0
    };
  }
);
