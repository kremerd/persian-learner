import { VerbDe } from '../../grammar/de/model/verb';

export type Word =
  Verb |
  GenericWord;

export interface Verb {
  type: 'verb';
  id: number;
  de: VerbDe;
  en: string;
  fa: string;
  faRm: string;
}

export interface GenericWord {
  type: 'noun' | 'adjective' | 'unclassified';
  id: number;
  de: string;
  en: string;
  fa: string;
  faRm: string;
}

export type WordType = Word['type'];
