import { buildConjugator } from '../buildConjugator';
import { PresentForm, VerbFa } from '../fa/model/verb';
import { Person } from '../model/verbForm';
import { endsWithAny } from '../util';
import { VerbStructure } from './model/verbStructure';

export const conjugateFa = buildConjugator<VerbFa>(
  {
    '1s': 'مَن',
    '2s': 'تو',
    '3s': 'او',
    '1p': 'ما',
    '2p': 'شُما',
    '3p': 'آنها',
  },
  {
    present: (verb, person) => conjugatePresent(verb, person),
  }
);

const conjugatePresent = (verb: VerbFa, person: Person): string => {
  const { preposition, prefix, stem } = parsePresentStem(verb.presentStem);
  const tensePrefix = getTensePrefix(verb.presentForm);
  const suffix = getSuffix(stem, person);
  return `${preposition ?? ''} ${prefix ?? ''}${tensePrefix}${stem}${suffix}`.trim();
};

const parsePresentStem = (presentStem: string): VerbStructure => {
  const regex = /^((?<preposition>.*) )?((?<prefix>.*)\|)?(?<stem>[^ ]+)$/;
  const match = presentStem.match(regex);
  if (match !== null) {
    return {
      preposition: match.groups?.preposition,
      prefix: match.groups?.prefix,
      stem: match.groups?.stem ?? '',
    };
  } else {
    throw new Error(`Could not parse Farsi present stem ${presentStem}.`);
  }
};

const getTensePrefix = (presentForm: PresentForm = 'imperfect'): string => {
  if (presentForm === 'imperfect') {
    return 'می‌';
  } else {
    return '';
  }
};

const getSuffix = (stem: string, person: Person): string => {
  const extension = (
    endsWithAny(stem, 'آ', 'ا', 'و') &&
    !endsWithAny(stem, 'آو', 'او', 'یو', 'َو', 'ِو', 'ُو')
  ) ? 'ی' : '';

  switch (person) {
  case '1s':
    return extension + 'َم';
  case '2s':
    return extension + 'ی';
  case '3s':
    return extension + 'َد';
  case '1p':
    return extension + 'یم';
  case '2p':
    return extension + 'ید';
  case '3p':
    return extension + 'َند';
  }
};
