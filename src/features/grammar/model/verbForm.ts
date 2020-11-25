export type VerbForm =
  SpecificTense |
  'infinitive';

export interface SpecificTense {
  person: Person;
  tense: Tense;
}

export type Person =
  '1s' |
  '2s' |
  '3s' |
  '1p' |
  '2p' |
  '3p';

export type Tense =
  'present';
