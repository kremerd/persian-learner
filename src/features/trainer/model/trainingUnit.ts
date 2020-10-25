export interface TrainingUnitWithPriority extends TrainingUnit {
  priority: number;
}

export interface TrainingUnit {
  id: number;
  lang: TrainingUnitLang;
}

export type TrainingUnitLang =
  'de' |
  'fa';
