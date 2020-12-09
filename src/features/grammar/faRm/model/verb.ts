import { ConjugationTable } from '../../model/conjugationTable';

export interface VerbFaRm {
  infinitive: string;
  presentForm?: PresentForm;
  presentStem: string;
  present?: Partial<ConjugationTable>;
}

export type PresentForm =
  'imperfect' |
  'simple';
