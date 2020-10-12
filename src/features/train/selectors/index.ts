import { createSelector } from '@reduxjs/toolkit';
import { State } from '../slice';

const selectSlice = (state: any): State => state.train;

export const selectedDe = createSelector([selectSlice], ({ units, selectedIdDe }) => {
  const selected = units.find(unit => unit.id === selectedIdDe);
  if (!selected) {
    throw new Error(`Selected learning unit (DE) with id ${selectedIdDe} does not exist.`);
  }
  return selected;
});

export default selectSlice;
