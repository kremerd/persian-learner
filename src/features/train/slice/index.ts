import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LearningProgress, LearningUnit } from '../model/learningUnit';
import vocabulary from './vocabulary.json';

const initialState: LearningUnit[] = vocabulary.map((vocab, i) => ({
  id: i,
  ...(vocab as Omit<LearningUnit, 'id'>)
}));

const slice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    passDe: (state, { payload }: PayloadAction<{ id: number }>): void => {
      const progress = getProgress(state, payload.id);
      progress.scoreDe = Math.min(progress.scoreDe + 1, 5);
      progress.lastCorrectDe = new Date();
    },
    failDe: (state, { payload }: PayloadAction<{ id: number }>): void => {
      const progress = getProgress(state, payload.id);
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

export const { passDe, failDe } = slice.actions;
export default slice.reducer;