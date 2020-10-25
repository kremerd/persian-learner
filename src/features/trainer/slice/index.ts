import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { differenceInSeconds } from 'date-fns';
import { LearningUnit } from '../../lexicon/model/learningUnit';
import { selectLearningUnits } from '../../lexicon/selectors';
import { TrainingProgress } from '../model/trainingProgress';
import { TrainingUnit } from '../model/trainingUnit';
import configuration from './configuration';
import selectRandom from './selectRandom';
import { buildEmptyProgress } from './trainingProgress';

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

export const select = createAsyncThunk(
  'train/select',
  (_, { getState }) => selectLearningUnits(getState())
);

const slice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    pass: (state: State): void => {
      const progress = getProgress(state);
      progress.scoreDe = Math.min(progress.scoreDe + 1, 5);
      progress.lastCorrectDe = new Date().toISOString();
    },
    fail: (state: State): void => {
      const progress = getProgress(state);
      progress.scoreDe = Math.max(progress.scoreDe - 1, 0);
    }
  },
  extraReducers: {
    [select.fulfilled.type]: (state, { payload: units }: { payload: LearningUnit[] }): void => {
      const { trainingProgress } = state;
      const selectedUnit = selectRandom(units as LearningUnit[], unit => getPriority(trainingProgress[unit.id]));
      state.trainingUnit = buildTrainingUnit(selectedUnit);
    }
  }
});

const getProgress = ({ trainingUnit, trainingProgress }: State): TrainingProgress => {
  if (trainingUnit === null) {
    throw new Error('No training unit selected');
  }

  if (trainingProgress[trainingUnit.id] === undefined) {
    trainingProgress[trainingUnit.id] = buildEmptyProgress();
  }

  return trainingProgress[trainingUnit.id];
};

const getPriority = ({ scoreDe, lastCorrectDe }: TrainingProgress = buildEmptyProgress()): number => {
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

const buildTrainingUnit = (learningUnit: LearningUnit | null): TrainingUnit | null => {
  if (learningUnit !== null) {
    return {
      id: learningUnit.id,
      lang: 'de',
    };
  } else {
    return null;
  }
};

export const { pass, fail } = slice.actions;
export default slice.reducer;