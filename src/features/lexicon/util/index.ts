import { conjugateDe } from '../../grammar/de/conjugation';
import { conjugateEn } from '../../grammar/en/conjugation';
import { conjugateFa } from '../../grammar/fa/conjugation';
import { conjugateFaRm } from '../../grammar/faRm/conjugation';
import { Word } from '../model/word';

export const normalizeDe = (word: Word): string => {
  if (word.type === 'verb') {
    return conjugateDe(word.de, 'infinitive');
  } else {
    return word.de;
  }
};

export const normalizeEn = (word: Word): string => {
  if (word.type === 'verb') {
    return conjugateEn(word.en, 'infinitive');
  } else {
    return word.en;
  }
};

export const normalizeFa = (word: Word): string => {
  if (word.type === 'verb') {
    return conjugateFa(word.fa, 'infinitive');
  } else {
    return word.fa;
  }
};

export const normalizeFaRm = (word: Word): string => {
  if (word.type === 'verb') {
    return conjugateFaRm(word.faRm, 'infinitive');
  } else {
    return word.faRm;
  }
};
