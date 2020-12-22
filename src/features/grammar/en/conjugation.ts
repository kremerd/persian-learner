import { Person, VerbForm } from '../model/verbForm';
import { endsWithAny } from '../util';
import { ConjugationDetails, VerbEn } from './model/verb';

export const conjugateEn = (verb: VerbEn, form: VerbForm): string => {
  const conjugationDetails = getConjugationDetails(verb);
  if (form === 'infinitive') {
    return conjugationDetails.infinitive;
  }

  const { person, tense } = form;
  const pronoun = getPronoun(person);

  switch (tense) {
  case 'present':
    return `${pronoun} ${conjugatePresent(conjugationDetails, person)}`;
  }
};

const getConjugationDetails = (verb: VerbEn): ConjugationDetails => {
  if (typeof verb === 'string') {
    return { infinitive: verb };
  } else {
    return verb;
  }
};

const getPronoun = (person: Person): string => {
  switch (person) {
  case '1s':
    return 'I';
  case '2s':
    return 'you';
  case '3s':
    return 'he / she';
  case '1p':
    return 'we';
  case '2p':
    return 'you';
  case '3p':
    return 'they';
  }
};

const conjugatePresent = (verb: ConjugationDetails, person: Person): string => {
  const explicitConjugation = verb.present && verb.present[person];
  if (explicitConjugation) {
    return explicitConjugation;
  } else if (person === '3s') {
    return autoConjugate3sPresent(verb.infinitive);
  } else {
    return verb.infinitive;
  }
};

const autoConjugate3sPresent = (infinitive: string): string => {
  const replaceTrailingY =
    endsWithAny(infinitive, 'y') &&
    !endsWithAny(infinitive, 'ay', 'ey', 'iy', 'oy', 'uy');
  const insertEExtension =
    endsWithAny(infinitive, 's', 'z', 'x', 'sh', 'ch', 'o') &&
    !endsWithAny(infinitive, 'oo');

  if (replaceTrailingY) {
    return infinitive.slice(0, -1) + 'ies';
  } else if (insertEExtension) {
    return infinitive + 'es';
  } else {
    return infinitive + 's';
  }
};
