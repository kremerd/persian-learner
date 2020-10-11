export interface LearningUnit {
  type: LearningUnitType;
  de: string;
  fa: string;
  faPh: string;
}

export type LearningUnitType =
  'noun' |
  'verb' |
  'unclassified';
