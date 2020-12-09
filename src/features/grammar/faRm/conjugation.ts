import { Person, VerbForm } from '../model/verbForm';
import { endsWithAny } from '../util';
import { VerbFaRm } from './model/verb';

export const conjugateFaRm = (verb: VerbFaRm, form: VerbForm): string => {
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
    return 'man';
  case '2s':
    return 'to';
  case '3s':
    return 'u';
  case '1p':
    return 'mâ';
  case '2p':
    return 'shomâ';
  case '3p':
    return 'ânhâ';
  }
};

const conjugatePresent = (verb: VerbFaRm, person: Person): string => {
  const explicitConjugation = verb.present && verb.present[person];
  if (explicitConjugation) {
    return explicitConjugation;
  } else {
    return autoConjugatePresent(verb, person);
  }
};

const autoConjugatePresent = (verb: VerbFaRm, person: Person): string => {
  const suffix = getSuffix(verb.presentStem, person);
  return `mi${verb.presentStem}${suffix}`;
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
