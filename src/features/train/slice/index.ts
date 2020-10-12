import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { min } from '../../../util/math';
import { selectRandomEntry } from '../../../util/random';
import { LearningProgress, LearningUnit } from '../model/learningUnit';
import vocabulary from './vocabulary.json';

export interface State {
  units: LearningUnit[];
  selectedDe: LearningUnit;
}

const learningUnits = vocabulary.map((vocab, i) => ({
  id: i,
  ...(vocab as Omit<LearningUnit, 'id'>)
}));

const initialState: State = {
  units: learningUnits,
  selectedDe: learningUnits[0]
};

const slice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    selectDe: (state): void => {
      const minScore = min(state.units, unit => unit.progress?.scoreDe ?? 0);
      const eligableUnits = state.units.filter(unit => unit.progress?.scoreDe ?? 0 === minScore);
      state.selectedDe = selectRandomEntry(eligableUnits);
    },
    passDe: ({ units }, { payload }: PayloadAction<{ id: number }>): void => {
      const progress = getProgress(units, payload.id);
      progress.scoreDe = Math.min(progress.scoreDe + 1, 5);
      progress.lastCorrectDe = new Date();
    },
    failDe: ({ units }, { payload }: PayloadAction<{ id: number }>): void => {
      const progress = getProgress(units, payload.id);
      progress.scoreDe = Math.max(progress.scoreDe - 1, 0);
    }
  }
});

const getProgress = (state: LearningUnit[], id: number): LearningProgress => {
  const unit = state.find(u => u.id === id);
  if (!unit) {
    throw new Error(`Learning unit with id ${id} does not exist.`);
  }

  unit.progress = {
    scoreDe: 0,
    scoreFaPh: 0,
    lastCorrectDe: null,
    lastCorrectFaPh: null,
    ...(unit.progress)
  };
  return unit.progress;
};

export const { passDe, failDe, selectDe } = slice.actions;
export default slice.reducer;