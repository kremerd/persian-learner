import { ConjugationTable } from '../../model/conjugationTable';

export interface VerbFaRm {
  infinitive: string;
  presentStem: string;
  present?: Partial<ConjugationTable>;
}
