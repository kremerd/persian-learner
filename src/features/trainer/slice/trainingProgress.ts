import { TrainingProgress } from '../model/trainingProgress';

export const buildEmptyProgress = (): TrainingProgress => ({
  scoreDe: 0,
  scoreFa: 0,
  lastCorrectDe: null,
  lastCorrectFa: null,
});