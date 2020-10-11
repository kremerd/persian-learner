import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LearningProgress, LearningUnit } from "./model/learning-unit";

const initialState: LearningUnit[] = [
  {
    id: 1,
    type: 'noun',
    de: 'de',
    fa: 'fa',
    faPh: 'ph'
  }
];

const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    passDe: (state, { payload }: PayloadAction<{ id: number }>) => {
      const progress = getProgress(state, payload.id);
      progress.scoreDe = Math.min(progress.scoreDe + 1, 5);
      progress.lastCorrectDe = new Date();
    },
    failDe: (state, { payload }: PayloadAction<{ id: number }>) => {
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

export const { passDe, failDe } = trainerSlice.actions;
export default trainerSlice.reducer;