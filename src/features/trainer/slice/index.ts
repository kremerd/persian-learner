import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { differenceInSeconds } from 'date-fns';
import { LearningUnit } from '../../lexicon/model/learningUnit';
import { selectLearningUnits } from '../../lexicon/selectors';
import { LangProgress, TrainingProgress } from '../model/trainingProgress';
import { TrainingUnit, TrainingUnitLang, TrainingUnitWithPriority } from '../model/trainingUnit';
import configuration from './configuration';
import selectRandom from './selectRandom';
import { buildEmptyProgress } from './trainingProgress';

export interface State {
  trainingUnit: TrainingUnit | null;
  trainingProgress: Record<number, TrainingProgress>;
}

const initialState: State = {
  trainingUnit: null,
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
      const progress = getLangProgress(state);
      progress.score = Math.min(progress.score + 1, 5);
      progress.lastCorrect = new Date().toISOString();
    },
    fail: (state: State): void => {
      const progress = getLangProgress(state);
      progress.score = Math.max(progress.score - 1, 0);
    }
  },
  extraReducers: {
    [select.fulfilled.type]: (state, { payload: units }: { payload: LearningUnit[] }): void => {
      const { trainingProgress } = state;
      const trainingUnits = units
        .map(({ id }) => getTrainingUnits(id, trainingProgress[id]))
        .flat();
      const selectedUnit = selectRandom(trainingUnits, unit => unit.priority);
      state.trainingUnit = copyTrainingUnit(selectedUnit);
    }
  }
});

const getLangProgress = ({ trainingUnit, trainingProgress }: State): LangProgress => {
  if (trainingUnit === null) {
    throw new Error('No training unit selected');
  }

  if (trainingProgress[trainingUnit.id] === undefined) {
    trainingProgress[trainingUnit.id] = buildEmptyProgress();
  }

  return trainingProgress[trainingUnit.id][trainingUnit.lang];
};

const getTrainingUnits = (id: number, progress: TrainingProgress = buildEmptyProgress()): TrainingUnitWithPriority[] => {
  const languages: TrainingUnitLang[] = ['de', 'fa'];
  return languages.map(lang => ({
    id,
    lang,
    priority: getPriority(progress[lang])
  }));
};

const getPriority = ({ score, lastCorrect }: LangProgress): number => {
  const config = configuration.find(c => c.score === score);
  const gap = getDifferenceFromNowInSeconds(lastCorrect);

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

const copyTrainingUnit = (unit: TrainingUnit | null): TrainingUnit | null => {
  if (unit !== null) {
    const { id, lang } = unit;
    return { id, lang };
  } else {
    return null;
  }
};

export const { pass, fail } = slice.actions;
export default slice.reducer;
