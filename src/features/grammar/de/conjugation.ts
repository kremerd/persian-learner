import { escapeRegExp } from '../../../util/string';
import { Person, VerbForm } from '../model/verbForm';
import { ConjugationDetails, VerbDe } from './model/verb';
import { VerbStructure } from './model/verbStructure';

export const conjugateDe = (verb: VerbDe, form: VerbForm): string => {
  const conjugationDetails = getConjugationDetails(verb);
  if (form === 'infinitive') {
    return conjugationDetails.infinitive.replace(/\|/g, '');
  }

  const { person, tense } = form;
  const pronoun = getPronoun(person);

  switch (tense) {
  case 'present':
    return `${pronoun} ${conjugatePresent(conjugationDetails, person)}`;
  }
};

const getConjugationDetails = (verb: VerbDe): ConjugationDetails => {
  if (typeof verb === 'string') {
    return { infinitive: verb };
  } else {
    return verb;
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
  const explicitConjugation = verb.present && verb.present[person];
  if (explicitConjugation) {
    return explicitConjugation;
  } else {
    return autoConjugatePresent(verb, person);
  }
};

const autoConjugatePresent = (verb: ConjugationDetails, person: Person): string => {
  const { prefix, stem } = parseVerb(verb, person);
  const suffix = getSuffix(stem, person);
  const appendedPrefix = getAppendedPrefix(prefix);

  if (endsWithAny(stem, 'el') && person === '1s') {
    return stem.slice(0, -2) + stem.slice(-1) + suffix + appendedPrefix;
  } else {
    return stem + suffix + appendedPrefix;
  }
};

const parseVerb = (verb: ConjugationDetails, person: Person): VerbStructure => {
  if (['2s', '3s'].includes(person) && verb?.present?.['3s'] !== undefined) {
    const { prefix } = parseInfinitive(verb.infinitive);
    return parse3s(verb.present['3s'], prefix);
  } else {
    return parseInfinitive(verb.infinitive);
  }
};

const parse3s = (_3s: string, prefix?: string): VerbStructure => {
  const appendixRegex = escapeRegExp(getAppendedPrefix(prefix));
  const regex = new RegExp(`^((?<etStem>.*)et|(?<tStem>.*)t)${appendixRegex}$`);
  const match = _3s.match(regex);
  if (match !== null) {
    return {
      prefix,
      stem: match.groups?.etStem ?? match.groups?.tStem ?? '',
    };
  } else {
    throw new Error(`Could not parse German 3s ${_3s}.`);
  }
};

const parseInfinitive = (infinitive: string): VerbStructure => {
  const regex = /^((?<prefix>[^|]*)\|)?((?<enStem>.*)en|(?<elnStem>.*el)n|(?<unStem>.*u)n)$/;
  const match = infinitive.match(regex);
  if (match !== null) {
    return {
      prefix: match.groups?.prefix,
      stem: match.groups?.enStem ?? match.groups?.elnStem ?? match.groups?.unStem ?? '',
    };
  } else {
    throw new Error(`Could not parse German infinitive ${infinitive}.`);
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

const getAppendedPrefix = (prefix: string | undefined): string => {
  if (prefix === undefined) {
    return '';
  } else {
    return ` ${prefix}`;
  }
};
