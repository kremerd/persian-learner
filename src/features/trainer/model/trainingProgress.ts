export interface ProgressAggregate {
  de?: TrainingProgress;
  fa?: TrainingProgress;
  faConj?: TrainingProgress;
}

export interface TrainingProgress {
  score: number;
  lastCorrect: string | null;
  lastTried: string | null;
}
