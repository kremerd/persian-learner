import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LearningUnit } from '../../lexicon/model/learningUnit';
import { selectLearningUnits } from '../../lexicon/selectors';
import { TrainingMode } from '../model/trainingMode';
import { LangProgress, TrainingProgress } from '../model/trainingProgress';
import { TrainingUnit, TrainingUnitLang, TrainingUnitWithPriority } from '../model/trainingUnit';
import SelectionStrategy from './selection/selectionStrategy';
import selectionStrategyFactory from './selection/selectionStrategyFactory';
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
  (trainingMode: TrainingMode, { getState }) => ({
    learningUnits: selectLearningUnits(getState()),
    trainingMode,
  })
);

interface SelectPayload {
  learningUnits: LearningUnit[];
  trainingMode: TrainingMode;
}

const slice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    pass: (state: State): void => {
      const progress = getLangProgress(state);
      progress.score = Math.min(progress.score + 1, 5);
      progress.lastCorrect = new Date().toISOString();
      progress.lastTried = progress.lastCorrect;
    },
    fail: (state: State): void => {
      const progress = getLangProgress(state);
      progress.score = Math.max(progress.score - 1, 0);
      progress.lastTried = new Date().toISOString();
    }
  },
  extraReducers: {
    [select.fulfilled.type]: (state, { payload: { learningUnits, trainingMode } }: PayloadAction<SelectPayload>): void => {
      const { trainingProgress } = state;
      const selectionStrategy = selectionStrategyFactory(trainingMode);

      const trainingUnits = learningUnits
        .map(({ id }) => buildTrainingUnits(id, trainingProgress[id], selectionStrategy))
        .flat();
      const selectedUnit = selectRandom(trainingUnits, unit => unit.priority);
      state.trainingUnit = extractTrainingUnit(selectedUnit);
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

const buildTrainingUnits = (
  id: number,
  progress: TrainingProgress = buildEmptyProgress(),
  selectionStrategy: SelectionStrategy
): TrainingUnitWithPriority[] => {
  const languages: TrainingUnitLang[] = ['de', 'fa'];
  return languages.map(lang => ({
    id,
    lang,
    priority: selectionStrategy(progress[lang])
  }));
};

const extractTrainingUnit = (unit: TrainingUnitWithPriority | null): TrainingUnit | null => {
  if (unit !== null) {
    const { id, lang } = unit;
    return { id, lang };
  } else {
    return null;
  }
};

export const { pass, fail } = slice.actions;
export default slice.reducer;
