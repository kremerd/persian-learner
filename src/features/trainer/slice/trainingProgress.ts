import { LangProgress, TrainingProgress } from '../model/trainingProgress';

export const buildEmptyProgress = (): TrainingProgress => ({
  de: buildEmptyLangProgress(),
  fa: buildEmptyLangProgress(),
});

export const buildEmptyLangProgress = (): LangProgress => ({
  score: 0,
  lastCorrect: null,
  lastTried: null,
});
