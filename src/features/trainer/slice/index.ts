import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LearningUnit } from '../../lexicon/model/learningUnit';
import { selectLearningUnits } from '../../lexicon/selectors';
import { PrioritizedEntity } from '../model/prioritizedEntity';
import { TrainingMode } from '../model/trainingMode';
import { ProgressAggregate, TrainingProgress } from '../model/trainingProgress';
import { Trainer, UnscoredTrainingUnit } from '../model/trainingUnit';
import SelectionStrategy from './selection/selectionStrategy';
import selectionStrategyFactory from './selection/selectionStrategyFactory';
import selectRandom from './selectRandom';
import { buildEmptyProgressAggregate } from './trainingProgress';

export interface State {
  currentTrainingUnit: UnscoredTrainingUnit | null;
  trainingProgress: Record<number, ProgressAggregate>;
}

const initialState: State = {
  currentTrainingUnit: null,
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

      const prioritizedUnits = learningUnits
        .map(learningUnit => buildPrioritizedUnits(learningUnit, trainingProgress[learningUnit.id], selectionStrategy))
        .flat();
      const selectedUnit = selectRandom(prioritizedUnits, unit => unit.priority);
      state.currentTrainingUnit = extractUnscoredTrainingUnit(selectedUnit);
    }
  }
});

const getLangProgress = ({ currentTrainingUnit, trainingProgress }: State): TrainingProgress => {
  if (currentTrainingUnit === null) {
    throw new Error('No training unit selected');
  }

  if (trainingProgress[currentTrainingUnit.id] === undefined) {
    trainingProgress[currentTrainingUnit.id] = buildEmptyProgressAggregate();
  }

  return trainingProgress[currentTrainingUnit.id][currentTrainingUnit.trainer];
};

const buildPrioritizedUnits = (
  learningUnit: LearningUnit,
  progress: ProgressAggregate = buildEmptyProgressAggregate(),
  selectionStrategy: SelectionStrategy
): PrioritizedEntity<UnscoredTrainingUnit>[] => {
  const trainers: Trainer[] = ['de', 'fa'];
  return trainers.map(trainer => ({
    entity: {
      ...learningUnit,
      trainer
    },
    priority: selectionStrategy(progress[trainer])
  }));
};

const extractUnscoredTrainingUnit = (unit: PrioritizedEntity<UnscoredTrainingUnit> | null): UnscoredTrainingUnit | null => {
  if (unit !== null) {
    const { id, trainer, de, en, fa, faRm } = unit.entity;
    return { id, trainer, de, en, fa, faRm };
  } else {
    return null;
  }
};

export const { pass, fail } = slice.actions;
export default slice.reducer;
