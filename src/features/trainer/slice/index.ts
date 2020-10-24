import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { differenceInSeconds } from 'date-fns';
import { LearningUnit } from '../../lexicon/model/learningUnit';
import { selectLearningUnits } from '../../lexicon/selectors';
import { LearningProgress } from '../model/learningProgress';
import configuration from './configuration';
import selectRandom from './selectRandom';

export interface State {
  selectedIdDe: number | null;
  progress: Record<number, LearningProgress>;
}

const initialState: State = {
  selectedIdDe: 0,
  progress: {}
};

export const selectDe = createAsyncThunk(
  'train/selectDe',
  (_, { getState }) => selectLearningUnits(getState())
);

const slice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    passDe: ({ selectedIdDe, progress }): void => {
      if (selectedIdDe === null) {
        throw new Error('No learning unit selected');
      }
      const specProgress = progress[selectedIdDe] ?? buildNoProgress();
      specProgress.scoreDe = Math.min(specProgress.scoreDe + 1, 5);
      specProgress.lastCorrectDe = new Date().toISOString();
    },
    failDe: ({ selectedIdDe, progress }): void => {
      if (selectedIdDe === null) {
        throw new Error('No learning unit selected');
      }
      const specProgress = progress[selectedIdDe] ?? buildNoProgress();
      specProgress.scoreDe = Math.max(specProgress.scoreDe - 1, 0);
    }
  },
  extraReducers: {
    [selectDe.fulfilled.type]: (state, { payload: units }): void => {
      const progress = state.progress;
      const selectedUnit = selectRandom(units as LearningUnit[], unit => getPriorityDe(progress[unit.id]));
      if (selectedUnit === null) {
        throw new Error('Could not select a new unit');
      }
      state.selectedIdDe = selectedUnit?.id ?? null;
    }
  }
});

const buildNoProgress = (): LearningProgress => ({
  scoreDe: 0,
  scoreFaPh: 0,
  lastCorrectDe: null,
  lastCorrectFaPh: null,
});

const getPriorityDe = ({ scoreDe, lastCorrectDe }: LearningProgress = buildNoProgress()): number => {
  const config = configuration.find(c => c.score === scoreDe);
  const gap = getDifferenceFromNowInSeconds(lastCorrectDe);

  if (config !== undefined && gap > config.minGap) {
    return config.frequency;
  } else {
    return 0;
  }
};

const getDifferenceFromNowInSeconds = (date: string | null): number => {
  if (date !== null) {
    return differenceInSeconds(new Date(), new Date(date));
  } else {
    return Number.POSITIVE_INFINITY;
  }
};

export const { passDe, failDe } = slice.actions;
export default slice.reducer;