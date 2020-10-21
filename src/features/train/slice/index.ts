import { createSlice } from '@reduxjs/toolkit';
import { differenceInSeconds } from 'date-fns';
import { LearningProgress, LearningUnit } from '../model/learningUnit';
import configuration from './configuration';
import selectRandom from './selectRandom';
import vocabulary from './vocabulary.json';

export interface State {
  units: LearningUnit[];
  selectedIdDe: number | null;
}

const learningUnits = vocabulary.map((vocab, i) => ({
  ...(vocab as Pick<LearningUnit, 'type' | 'de' | 'en' | 'fa' | 'faRm'>),
  id: i,
  progress: {
    scoreDe: 0,
    scoreFaPh: 0,
    lastCorrectDe: null,
    lastCorrectFaPh: null,
  },
}));

const initialState: State = {
  units: learningUnits,
  selectedIdDe: 0,
};

const slice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    selectDe: (state): void => {
      const selectedUnit = selectRandom(state.units, unit => getPriorityDe(unit));
      state.selectedIdDe = selectedUnit?.id ?? null;
    },
    passDe: ({ units, selectedIdDe }): void => {
      const progress = getProgress(units, selectedIdDe);
      progress.scoreDe = Math.min(progress.scoreDe + 1, 5);
      progress.lastCorrectDe = new Date().toISOString();
    },
    failDe: ({ units, selectedIdDe }): void => {
      const progress = getProgress(units, selectedIdDe);
      progress.scoreDe = Math.max(progress.scoreDe - 1, 0);
    }
  }
});

const getPriorityDe = (unit: LearningUnit): number => {
  const { scoreDe, lastCorrectDe } = unit.progress;
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

const getProgress = (state: LearningUnit[], id: number | null): LearningProgress => {
  const unit = state.find(u => u.id === id);
  if (!unit) {
    throw new Error(`Learning unit with id ${id} does not exist.`);
  }
  return unit.progress;
};

export const { passDe, failDe, selectDe } = slice.actions;
export default slice.reducer;