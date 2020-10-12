import { createSlice } from '@reduxjs/toolkit';
import { min } from '../../../util/math';
import { selectRandomEntry } from '../../../util/random';
import { LearningProgress, LearningUnit } from '../model/learningUnit';
import vocabulary from './vocabulary.json';

export interface State {
  units: LearningUnit[];
  selectedIdDe: number;
}

const learningUnits = vocabulary.map((vocab, i) => ({
  ...(vocab as Pick<LearningUnit, 'type' | 'de' | 'fa' | 'faPh'>),
  id: i,
  progress: {
    scoreDe: 0,
    scoreFaPh: 0,
    lastCorrectDe: null,
    lastCorrectFaPh: null,
  },
}));

const initialState: State = {
  units: learningUnits,
  selectedIdDe: 0,
};

const slice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    selectDe: (state): void => {
      const minScore = min(state.units, unit => unit.progress.scoreDe);
      const eligableUnits = state.units.filter(unit => unit.progress.scoreDe === minScore);
      state.selectedIdDe = selectRandomEntry(eligableUnits).id;
    },
    passDe: ({ units, selectedIdDe }): void => {
      const progress = getProgress(units, selectedIdDe);
      progress.scoreDe = Math.min(progress.scoreDe + 1, 5);
      progress.lastCorrectDe = new Date();
    },
    failDe: ({ units, selectedIdDe }): void => {
      const progress = getProgress(units, selectedIdDe);
      progress.scoreDe = Math.max(progress.scoreDe - 1, 0);
    }
  }
});

const getProgress = (state: LearningUnit[], id: number): LearningProgress => {
  const unit = state.find(u => u.id === id);
  if (!unit) {
    throw new Error(`Learning unit with id ${id} does not exist.`);
  }
  return unit.progress;
};

export const { passDe, failDe, selectDe } = slice.actions;
export default slice.reducer;