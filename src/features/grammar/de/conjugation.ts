import { Person, Tense } from '../model/primitives';

export const conjugate = (infinitive: string, tense: Tense, person: Person): string => {
  const pronoun = getPronoun(person);

  switch (tense) {
  case 'present':
    return `${pronoun} ${conjugatePresent(infinitive, person)}`;
  }
};

const getPronoun = (person: Person): string => {
  switch (person) {
  case '1s':
    return 'ich';
  case '2s':
    return 'du';
  case '3s':
    return 'er / sie';
  case '1p':
    return 'wir';
  case '2p':
    return 'ihr';
  case '3p':
    return 'sie';
  }
};

const conjugatePresent = (infinitive: string, person: Person): string => {
  const stem = getStem(infinitive);
  const suffix = getSuffix(stem, person);

  if (endsWithAny(stem, 'el') && person === '1s') {
    return stem.slice(0, -2) + stem.slice(-1) + suffix;
  } else {
    return stem + suffix;
  }
};

const getStem = (infinitive: string): string => {
  const regex = /^(.*)en|(.*el)n$/;
  const match = infinitive.match(regex);
  if (match !== null) {
    return match[1] ?? match[2];
  } else {
    throw new Error(`Did not find stem of ${infinitive}.`);
  }
};

const getSuffix = (stem: string, person: Person): string => {
  const insertEExtension =
    endsWithAny(stem, 'd', 't') ||
    (
      endsWithAny(stem, 'm', 'n') &&
      !endsWithAny(stem, 'mm', 'nn', 'rm', 'rn', 'lm', 'ln')
    );
  const omitEExtension = endsWithAny(stem, 'el');
  const omitS = endsWithAny(stem, 's', 'ss', 'ß', 'z', 'tz', 'x', 'chs');

  switch (person) {
  case '1s':
    return 'e';
  case '2s':
    return insertEExtension ? 'est' : omitS ? 't' : 'st';
  case '3s':
    return insertEExtension ? 'et' : 't';
  case '1p':
    return omitEExtension ? 'n' : 'en';
  case '2p':
    return insertEExtension ? 'et' : 't';
  case '3p':
    return omitEExtension ? 'n' : 'en';
  }
};

const endsWithAny = (string: string, ...suffixes: string[]): boolean => {
  return suffixes.some(suffix => string.endsWith(suffix));
};
