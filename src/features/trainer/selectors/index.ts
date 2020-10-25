import { createSelector } from '@reduxjs/toolkit';
import { getKey } from '../../../util/record';
import { selectLearningUnitRecord } from '../../lexicon/selectors';
import { State } from '../slice';
import { buildEmptyProgress } from '../slice/trainingProgress';

const selectSlice = (state: any): State => state.trainer;
export default selectSlice;

export const selectCurrentLanguage = createSelector([selectSlice], ({ trainingUnit }) => trainingUnit?.lang ?? null);

export const selectCurrentLearningUnit = createSelector([selectSlice, selectLearningUnitRecord],
  ({ trainingUnit }, units) => getKey(trainingUnit?.id, units)
);

export const selectCurrentTrainingProgress = createSelector([selectSlice],
  ({ trainingUnit, trainingProgress }) => getKey(trainingUnit?.id, trainingProgress) ?? buildEmptyProgress()
);
