export interface LearningUnit {
  id: number;
  type: LearningUnitType;
  de: string;
  fa: string;
  faPh: string;
  progress: LearningProgress;
}

export type LearningUnitType =
  'noun' |
  'verb' |
  'unclassified';

export interface LearningProgress {
  scoreDe: number;
  scoreFaPh: number;
  lastCorrectDe: string | null;
  lastCorrectFaPh: string | null;
}