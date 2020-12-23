import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { conjugateDe } from '../../grammar/de/conjugation';
import { conjugateEn } from '../../grammar/en/conjugation';
import { conjugateFa } from '../../grammar/fa/conjugation';
import { conjugateFaRm } from '../../grammar/faRm/conjugation';
import { Person } from '../../grammar/model/verbForm';
import { Verb, Word } from '../../lexicon/model/word';
import { selectWords } from '../../lexicon/selectors';
import { normalizeDe, normalizeEn, normalizeFa, normalizeFaRm } from '../../lexicon/util';
import { PrioritizedEntity } from '../model/prioritizedEntity';
import { TrainingMode } from '../model/trainingMode';
import { ProgressAggregate, TrainingProgress } from '../model/trainingProgress';
import { Trainer, UnscoredTrainingUnit } from '../model/trainingUnit';
import SelectionStrategy from './selection/selectionStrategy';
import selectionStrategyFactory from './selection/selectionStrategyFactory';
import selectRandom from './selectRandom';
import { buildEmptyTrainingProgress, getTrainingProgress } from './trainingProgress';

export interface State {
  currentTrainingUnit: UnscoredTrainingUnit | null;
  progress: Record<number, ProgressAggregate>;
}

const initialState: State = {
  currentTrainingUnit: null,
  progress: {},
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
      const progress = getProgress(state);
      progress.score = Math.min(progress.score + 1, 5);
      progress.lastCorrect = new Date().toISOString();
      progress.lastTried = progress.lastCorrect;
    },
    fail: (state: State): void => {
      const progress = getProgress(state);
      progress.score = Math.max(progress.score - 1, 0);
      progress.lastTried = new Date().toISOString();
    }
  },
  extraReducers: {
    [select.fulfilled.type]: (state, { payload: { words, trainingMode } }: PayloadAction<SelectPayload>): void => {
      const { progress } = state;
      const selectionStrategy = selectionStrategyFactory(trainingMode);

      const prioritizedUnits = words
        .map(word => buildPrioritizedUnits(word, progress, selectionStrategy))
        .flat();
      const selectedUnit = selectRandom(prioritizedUnits, unit => unit.priority);
      state.currentTrainingUnit = extractUnscoredTrainingUnit(selectedUnit);
    }
  }
});

const getProgress = ({ currentTrainingUnit, progress }: State): TrainingProgress => {
  if (currentTrainingUnit === null) {
    throw new Error('No training unit selected');
  }

  if (progress[currentTrainingUnit.id] === undefined) {
    progress[currentTrainingUnit.id] = {};
  }
  if (progress[currentTrainingUnit.id][currentTrainingUnit.trainer] === undefined) {
    progress[currentTrainingUnit.id][currentTrainingUnit.trainer] = buildEmptyTrainingProgress();
  }

  return getTrainingProgress(progress, currentTrainingUnit.id, currentTrainingUnit.trainer);
};

const buildPrioritizedUnits = (
  word: Word,
  progress: Record<number, ProgressAggregate>,
  selectionStrategy: SelectionStrategy
): PrioritizedEntity<UnscoredTrainingUnit>[] => {
  return buildTrainingUnits(word).map(unit => ({
    entity: unit,
    priority: selectionStrategy(getTrainingProgress(progress, word.id, unit.trainer))
  }));
};

const buildTrainingUnits = (word: Word): UnscoredTrainingUnit[] => {
  const trainers: UnscoredTrainingUnit[] = [
    buildNormalTrainingUnit(word, 'de'),
    buildNormalTrainingUnit(word, 'fa')
  ];

  if (word.type === 'verb') {
    trainers.push(buildConjugationTrainingUnit(word));
  }

  return trainers;
};

const buildNormalTrainingUnit = (word: Word, trainer: Trainer): UnscoredTrainingUnit => {
  return {
    id: word.id,
    trainer,
    de: normalizeDe(word),
    en: normalizeEn(word),
    fa: normalizeFa(word),
    faRm: normalizeFaRm(word),
  };
};

const buildConjugationTrainingUnit = (word: Verb): UnscoredTrainingUnit => {
  const person = pickRandomPerson();
  return {
    id: word.id,
    trainer: 'faConj',
    de: conjugateDe(word.de, { person, tense: 'present' }),
    en: conjugateEn(word.en, { person, tense: 'present' }),
    fa: conjugateFa(word.fa, { person, tense: 'present' }),
    faRm: conjugateFaRm(word.faRm, { person, tense: 'present' }),
  };
};

const pickRandomPerson = (): Person => {
  const result = selectRandom<Person>(['1s', '2s', '3s', '1p', '2p', '3p'], () => 1);
  if (result !== null) {
    return result;
  } else {
    throw new Error('Error while picking a random person for conjugation');
  }
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
