import { TrainingProgress } from '../model/trainingProgress';

export const buildEmptyProgress = (): TrainingProgress => ({
  de: {
    score: 0,
    lastCorrect: null,
  },
  fa: {
    score: 0,
    lastCorrect: null,
  },
});
