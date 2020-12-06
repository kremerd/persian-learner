export interface ProgressAggregate {
  de: TrainingProgress;
  fa: TrainingProgress;
}

export interface TrainingProgress {
  score: number;
  lastCorrect: string | null;
  lastTried: string | null;
}
