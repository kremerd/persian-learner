import { buildConjugator } from '../buildConjugator';
import { ConjugationDetails } from '../model/conjugationDetails';
import { Person } from '../model/verbForm';
import { endsWithAny } from '../util';

export const conjugateEn = buildConjugator<ConjugationDetails>(
  {
    '1s': 'I',
    '2s': 'you',
    '3s': 'he / she',
    '1p': 'we',
    '2p': 'you',
    '3p': 'they',
  },
  {
    present: (verb, person) => conjugatePresent(verb, person),
  }
);

const conjugatePresent = (verb: ConjugationDetails, person: Person): string => {
  if (person === '3s') {
    return conjugate3sPresent(verb.infinitive);
  } else {
    return verb.infinitive;
  }
};

const conjugate3sPresent = (infinitive: string): string => {
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
