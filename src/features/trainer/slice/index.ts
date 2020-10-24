import { createSlice } from '@reduxjs/toolkit';
import { differenceInSeconds } from 'date-fns';
import { LearningUnit } from '../../lexicon/model/learningUnit';
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

const slice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    selectDe: (state, { payload: units }): void => {
      const progress = state.progress;
      const selectedUnit = selectRandom(units as LearningUnit[], unit => getPriorityDe(progress[unit.id]));
      if (selectedUnit === null) {
        throw new Error('Could not select a new unit');
      }
      state.selectedIdDe = selectedUnit?.id ?? null;
    },
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

export const { passDe, failDe, selectDe } = slice.actions;
export default slice.reducer;