export interface TrainingProgress {
  de: LangProgress;
  fa: LangProgress;
}

export interface LangProgress {
  score: number;
  lastCorrect: string | null;
  lastTried: string | null;
}
