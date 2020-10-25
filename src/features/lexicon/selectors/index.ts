import { createSelector } from '@reduxjs/toolkit';
import { State } from '../slice';

const selectSlice = (state: any): State => state.lexicon;
export default selectSlice;

export const selectLearningUnitRecord = createSelector([selectSlice],
  ({ units }) => units
);

export const selectLearningUnits = createSelector([selectLearningUnitRecord],
  units => Object.keys(units).map(k => units[k as unknown as number])
);
