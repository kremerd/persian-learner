import { ConjugationTable } from '../../model/conjugationTable';

export type VerbEn = string | ConjugationDetails;

export interface ConjugationDetails {
  infinitive: string;
  present?: Partial<ConjugationTable>;
}
