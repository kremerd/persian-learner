import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { differenceInSeconds } from 'date-fns';
import { LearningUnit } from '../../lexicon/model/learningUnit';
import { selectLearningUnits } from '../../lexicon/selectors';
import { TrainingProgress } from '../model/trainingProgress';
import { TrainingUnit } from '../model/trainingUnit';
import configuration from './configuration';
import selectRandom from './selectRandom';

export interface State {
  trainingUnit: TrainingUnit | null;
  trainingProgress: Record<number, TrainingProgress>;
}

const initialState: State = {
  // TODO: Set to null
  trainingUnit: {
    id: 0,
    lang: 'de',
  },
  trainingProgress: {},
};

export const selectDe = createAsyncThunk(
  'train/selectDe',
  (_, { getState }) => selectLearningUnits(getState())
);

const slice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    passDe: ({ trainingUnit, trainingProgress }): void => {
      const progress = getProgress(trainingUnit, trainingProgress);
      progress.scoreDe = Math.min(progress.scoreDe + 1, 5);
      progress.lastCorrectDe = new Date().toISOString();
    },
    failDe: ({ trainingUnit, trainingProgress }): void => {
      const progress = getProgress(trainingUnit, trainingProgress);
      progress.scoreDe = Math.max(progress.scoreDe - 1, 0);
    }
  },
  extraReducers: {
    [selectDe.fulfilled.type]: (state, { payload: units }: { payload: LearningUnit[] }): void => {
      const { trainingProgress } = state;
      const selectedUnit = selectRandom(units as LearningUnit[], unit => getPriorityDe(trainingProgress[unit.id]));
      if (selectedUnit === null) {
        state.trainingUnit = null;
      } else {
        state.trainingUnit = {
          lang: 'de',
          id: selectedUnit.id
        };
      }
    }
  }
});

const getProgress = (trainingUnit: TrainingUnit | null, progress: Record<number, TrainingProgress>): TrainingProgress => {
  if (trainingUnit !== null) {
    return progress[trainingUnit.id] ?? buildNoProgress();
  } else {
    throw new Error('No training unit selected');
  }
};

const buildNoProgress = (): TrainingProgress => ({
  scoreDe: 0,
  scoreFa: 0,
  lastCorrectDe: null,
  lastCorrectFa: null,
});

const getPriorityDe = ({ scoreDe, lastCorrectDe }: TrainingProgress = buildNoProgress()): number => {
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