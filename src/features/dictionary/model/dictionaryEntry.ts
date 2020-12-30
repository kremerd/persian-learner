import { Word } from '../../lexicon/model/word';

export interface DictionaryEntry {
  id: number;
  de: string;
  fa: string;
  searchIndex: string[];
  word: Word;
  score: DictionaryScore;
}

export interface DictionaryScore {
  de?: number;
  deConj?: number;
  fa?: number;
  faConj?: number;
}
