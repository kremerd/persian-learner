import { conjugateDe } from '../../grammar/de/conjugation';
import { Word } from '../model/word';

export const normalizeDe = (word: Word): string => {
  if (word.type === 'verb') {
    return conjugateDe(word.de, 'infinitive');
  } else {
    return word.de;
  }
};

export const normalizeEn = (word: Word): string => {
  return word.en;
};

export const normalizeFa = (word: Word): string => {
  return word.fa;
};

export const normalizeFaRm = (word: Word): string => {
  return word.faRm;
};
