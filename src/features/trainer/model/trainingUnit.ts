export interface TrainingUnit extends UnscoredTrainingUnit {
  score: number;
}

export interface UnscoredTrainingUnit {
  id: number;
  trainer: Trainer;
  de: string;
  en: string;
  fa: string;
  faRm: string;
}

export type Trainer =
  'de' |
  'fa';
