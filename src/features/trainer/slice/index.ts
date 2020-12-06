import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Word } from '../../lexicon/model/word';
import { selectWords } from '../../lexicon/selectors';
import { normalizeDe, normalizeEn, normalizeFa, normalizeFaRm } from '../../lexicon/util';
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
    words: selectWords(getState()),
    trainingMode,
  })
);

interface SelectPayload {
  words: Word[];
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
    [select.fulfilled.type]: (state, { payload: { words, trainingMode } }: PayloadAction<SelectPayload>): void => {
      const { trainingProgress } = state;
      const selectionStrategy = selectionStrategyFactory(trainingMode);

      const prioritizedUnits = words
        .map(word => buildPrioritizedUnits(word, trainingProgress[word.id], selectionStrategy))
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
  word: Word,
  progress: ProgressAggregate = buildEmptyProgressAggregate(),
  selectionStrategy: SelectionStrategy
): PrioritizedEntity<UnscoredTrainingUnit>[] => {
  const trainers: Trainer[] = ['de', 'fa'];
  return trainers.map(trainer => ({
    entity: {
      id: word.id,
      trainer,
      de: normalizeDe(word),
      en: normalizeEn(word),
      fa: normalizeFa(word),
      faRm: normalizeFaRm(word),
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
