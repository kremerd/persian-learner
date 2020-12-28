import { escapeRegExp } from '../../../util/string';
import { buildConjugator } from '../buildConjugator';
import { ConjugationDetails } from '../model/conjugationDetails';
import { Person } from '../model/verbForm';
import { endsWithAny } from '../util';
import { VerbStructure } from './model/verbStructure';

export const conjugateDe = buildConjugator<ConjugationDetails>(
  {
    '1s': 'ich',
    '2s': 'du',
    '3s': 'er / sie',
    '1p': 'wir',
    '2p': 'ihr',
    '3p': 'sie',
  },
  {
    present: (verb, person) => conjugatePresent(verb, person),
  }
);

const conjugatePresent = (verb: ConjugationDetails, person: Person): string => {
  const { hasDeepEOmitOn1s, prefix, stem } = parseVerb(verb, person);
  const suffix = getSuffix(stem, person);
  const appendedPrefix = getAppendedPrefix(prefix);

  if (hasDeepEOmitOn1s && person === '1s') {
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
      hasDeepEOmitOn1s: match.groups?.elnStem !== undefined,
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
  const omitEExtension = endsWithAny(stem, 'el', 'u') &&
    !endsWithAny(stem, 'iel');
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

const getAppendedPrefix = (prefix: string | undefined): string => {
  if (prefix === undefined) {
    return '';
  } else {
    return ` ${prefix}`;
  }
};
