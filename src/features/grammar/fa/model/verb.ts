import { ConjugationDetails } from '../../model/conjugationDetails';

export interface VerbFa extends ConjugationDetails {
  presentForm?: PresentForm;
  presentStem: string;
}

export type PresentForm =
  'imperfect' |
  'simple';
