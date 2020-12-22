import { Person } from './verbForm';

export interface ConjugationDetails {
  infinitive: string;
  present?: Record<Person, string>;
}
