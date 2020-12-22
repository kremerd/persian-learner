import { ConjugationDetails } from './model/conjugationDetails';
import { Person, Tense, VerbForm } from './model/verbForm';

export const buildConjugator = <T extends ConjugationDetails> (
  pronouns: Record<Person, string>,
  conjugations: Record<Tense, (verb: T, person: Person) => string>,
) => (verb: string | T, form: VerbForm): string => {

    const conjugate = (verb: string | T, form: VerbForm): string => {
      const conjugationDetails = getConjugationDetails(verb);
      if (form === 'infinitive') {
        return conjugationDetails.infinitive.replace(/\|/g, '');
      }

      const { person, tense } = form;
      const pronoun = pronouns[person];
      const conjugatedVerb = conjugateVerb(conjugationDetails, person, tense);
      return `${pronoun} ${conjugatedVerb}`;
    };

    const getConjugationDetails = <C extends ConjugationDetails> (verb: string | C): C => {
      if (typeof verb === 'string') {
        return { infinitive: verb } as C;
      } else {
        return verb;
      }
    };

    const conjugateVerb = (verb: T, person: Person, tense: Tense): string => {
      const explicitConjugation = verb[tense] && verb[tense]?.[person];
      if (explicitConjugation) {
        return explicitConjugation;
      } else {
        return conjugations[tense](verb, person);
      }
    };

    return conjugate(verb, form);
  };
