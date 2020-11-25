import { Person, Tense } from '../model/primitives';
import { ConjugationDetails } from './model/conjugationDetails';
import { VerbStructure } from './model/verbStructure';

export const conjugate = (verb: ConjugationDetails, tense: Tense, person: Person): string => {
  const pronoun = getPronoun(person);

  switch (tense) {
  case 'present':
    return `${pronoun} ${conjugatePresent(verb, person)}`;
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

const conjugatePresent = (verb: ConjugationDetails, person: Person): string => {
  const { preposition, stem } = parseVerb(verb);
  const suffix = getSuffix(stem, person);
  const appendedPreposition = getAppendedPreposition(preposition);

  if (endsWithAny(stem, 'el') && person === '1s') {
    return stem.slice(0, -2) + stem.slice(-1) + suffix + appendedPreposition;
  } else {
    return stem + suffix + appendedPreposition;
  }
};

const parseVerb = (verb: ConjugationDetails): VerbStructure => {
  return parseInfinitive(verb.infinitive);
};

const parseInfinitive = (infinitive: string): VerbStructure => {
  const regex = /^((?<preposition>[^|]*)\|)?((?<enStem>.*)en|(?<elnStem>.*el)n|(?<unStem>.*u)n)$/;
  const match = infinitive.match(regex);
  if (match !== null) {
    return {
      preposition: match.groups?.preposition,
      stem: match.groups?.enStem ?? match.groups?.elnStem ?? match.groups?.unStem ?? '',
    };
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
  const omitEExtension = endsWithAny(stem, 'el', 'u');
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

const getAppendedPreposition = (preposition: string | undefined): string => {
  if (preposition === undefined) {
    return '';
  } else {
    return ` ${preposition}`;
  }
};
