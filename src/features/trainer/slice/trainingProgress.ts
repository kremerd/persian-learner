import { ProgressAggregate, TrainingProgress } from '../model/trainingProgress';
import { Trainer } from '../model/trainingUnit';

export const getTrainingProgress = (
  progress: Record<number, ProgressAggregate>,
  id: number,
  trainer: Trainer
): TrainingProgress => {
  return progress[id]?.[trainer] ?? buildEmptyTrainingProgress();
};

export const buildEmptyTrainingProgress = (): TrainingProgress => ({
  score: 0,
  lastCorrect: null,
  lastTried: null,
});
