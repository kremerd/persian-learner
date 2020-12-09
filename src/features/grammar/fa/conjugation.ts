import { PresentForm, VerbFa } from '../fa/model/verb';
import { Person, VerbForm } from '../model/verbForm';
import { VerbStructure } from '../model/verbStructure';
import { endsWithAny } from '../util';

export const conjugateFa = (verb: VerbFa, form: VerbForm): string => {
  if (form === 'infinitive') {
    return verb.infinitive;
  }

  const { person, tense } = form;
  const pronoun = getPronoun(person);

  switch (tense) {
  case 'present':
    return `${pronoun} ${conjugatePresent(verb, person)}`;
  }
};

const getPronoun = (person: Person): string => {
  switch (person) {
  case '1s':
    return 'مَن';
  case '2s':
    return 'تو';
  case '3s':
    return 'او';
  case '1p':
    return 'ما';
  case '2p':
    return 'شُما';
  case '3p':
    return 'آنها';
  }
};

const conjugatePresent = (verb: VerbFa, person: Person): string => {
  const explicitConjugation = verb.present && verb.present[person];
  if (explicitConjugation) {
    return explicitConjugation;
  } else {
    return autoConjugatePresent(verb, person);
  }
};

const autoConjugatePresent = (verb: VerbFa, person: Person): string => {
  const { prefix, stem } = parsePresentStem(verb.presentStem);
  const tensePrefix = getTensePrefix(verb.presentForm);
  const suffix = getSuffix(stem, person);
  return `${prefix ?? ''}${tensePrefix}${stem}${suffix}`;
};

const parsePresentStem = (presentStem: string): VerbStructure => {
  const regex = /^(?<prefix>.* )?(?<stem>[^ ]+)$/;
  const match = presentStem.match(regex);
  if (match !== null) {
    return {
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
  const extension = endsWithAny(stem, 'آ', 'ا', 'و') ? 'ی' : '';

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
