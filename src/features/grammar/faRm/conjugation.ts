import { buildConjugator } from '../buildConjugator';
import { PresentForm, VerbFa } from '../fa/model/verb';
import { VerbStructure } from '../fa/model/verbStructure';
import { Person } from '../model/verbForm';
import { endsWithAny } from '../util';

export const conjugateFaRm = buildConjugator<VerbFa>(
  {
    '1s': 'man',
    '2s': 'to',
    '3s': 'u',
    '1p': 'mâ',
    '2p': 'shomâ',
    '3p': 'ânhâ',
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
  const regex = /^((?<preposition>.*) )?((?<prefix>[^|]*)\|)?(?<stem>[^ ]+)$/;
  const match = presentStem.match(regex);
  if (match !== null) {
    return {
      preposition: match.groups?.preposition,
      prefix: match.groups?.prefix,
      stem: match.groups?.stem ?? '',
    };
  } else {
    throw new Error(`Could not parse romanized Farsi present stem ${presentStem}.`);
  }
};

const getTensePrefix = (presentForm: PresentForm = 'imperfect'): string => {
  if (presentForm === 'imperfect') {
    return 'mi';
  } else {
    return '';
  }
};

const getSuffix = (stem: string, person: Person): string => {
  const extension = endsWithAny(stem, 'â', 'u') ? 'y' : '';

  switch (person) {
  case '1s':
    return extension + 'am';
  case '2s':
    return extension + 'i';
  case '3s':
    return extension + 'ad';
  case '1p':
    return extension + 'im';
  case '2p':
    return extension + 'id';
  case '3p':
    return extension + 'and';
  }
};
