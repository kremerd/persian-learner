import { VerbDe } from '../../grammar/de/model/verb';
import { VerbEn } from '../../grammar/en/model/verb';
import { VerbFa } from '../../grammar/fa/model/verb';

export type Word =
  Verb |
  GenericWord;

export interface Verb {
  type: 'verb';
  id: number;
  de: VerbDe;
  en: VerbEn;
  fa: VerbFa;
  faRm: VerbFa;
}

export interface GenericWord {
  type: 'noun' | 'adjective' | 'phrase' | 'unclassified';
  id: number;
  de: string;
  en: string;
  fa: string;
  faRm: string;
}

export type WordType = Word['type'];
