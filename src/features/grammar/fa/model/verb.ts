import { ConjugationTable } from '../../model/conjugationTable';

export interface VerbFa {
  infinitive: string;
  presentForm?: PresentForm;
  presentStem: string;
  present?: Partial<ConjugationTable>;
}

export type PresentForm =
  'imperfect' |
  'simple';
