import { WordType } from '../../lexicon/model/word';

export interface DictionaryEntry {
  id: number;
  type: WordType;
  de: string;
  en: string;
  fa: string;
  faRm: string;
  scoreDe: number | null;
  scoreFa: number | null;
}
