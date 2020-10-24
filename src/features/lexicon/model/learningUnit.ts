export interface LearningUnit {
  id: number;
  type: LearningUnitType;
  de: string;
  en: string;
  fa: string;
  faRm: string;
}

export type LearningUnitType =
  'noun' |
  'verb' |
  'adjective' |
  'unclassified';