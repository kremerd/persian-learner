import { ConjugationTable } from '../../model/conjugationTable';

export type VerbDe = string | ConjugationDetails;

export interface ConjugationDetails {
  infinitive: string;
  present?: Partial<ConjugationTable>;
}
