export interface LearningUnit {
  id: number;
  type: LearningUnitType;
  de: string;
  en: string;
  fa: string;
  faRm: string;
  progress: LearningProgress;
}

export type LearningUnitType =
  'noun' |
  'verb' |
  'adjective' |
  'unclassified';

export interface LearningProgress {
  scoreDe: number;
  scoreFaPh: number;
  lastCorrectDe: string | null;
  lastCorrectFaPh: string | null;
}