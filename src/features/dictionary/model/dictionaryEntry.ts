import { LearningUnit } from '../../lexicon/model/learningUnit';

export interface DictionaryEntry extends LearningUnit {
  scoreDe: number | null;
  scoreFa: number | null;
}
