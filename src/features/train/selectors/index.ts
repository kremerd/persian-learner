import { createSelector } from '@reduxjs/toolkit';
import { State } from '../slice';

const selectSlice = (state: any): State => state.train;

export const selectedDe = createSelector([selectSlice], ({ units, selectedIdDe }) => {
  const selected = units.find(unit => unit.id === selectedIdDe);
  return selected ?? null;
});

export default selectSlice;
