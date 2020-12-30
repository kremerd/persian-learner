import { createSelector } from '@reduxjs/toolkit';
import { State } from '../slice';

const selectSlice = (state: any): State => state.lexicon;
export default selectSlice;

export const selectWordRecord = createSelector([selectSlice],
  ({ words }) => words
);

export const selectWords = createSelector([selectWordRecord],
  words => Object.values(words)
);
