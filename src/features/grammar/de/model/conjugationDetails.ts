import { ConjugationTable } from '../../model/conjugationTable';

export interface ConjugationDetails {
  infinitive: string;
  present?: Partial<ConjugationTable>;
}
