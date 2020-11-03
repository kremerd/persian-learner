import { createSelector } from '@reduxjs/toolkit';
import { LearningUnit } from '../../lexicon/model/learningUnit';
import { selectLearningUnits } from '../../lexicon/selectors';
import { TrainingProgress } from '../../trainer/model/trainingProgress';
import { selectTrainingProgress } from '../../trainer/selectors';
import { DictionaryEntry } from '../model/dictionaryEntry';
import { DictionaryFilter } from '../model/dictionaryFilter';
import { State } from '../slice';

const selectSlice = (state: any): State => state.dictionary;
export default selectSlice;

export const selectFilter = createSelector([selectSlice], state => state.filter);

export const selectDictionary = createSelector([selectFilter, selectLearningUnits, selectTrainingProgress],
  (filter, learningUnits, trainingProgress) => learningUnits
    .filter(unit => unitMatchesFilter(unit, filter))
    .map(unit => buildDictionaryEntry(unit, trainingProgress))
);

const unitMatchesFilter = (unit: LearningUnit, { searchTerm }: Partial<DictionaryFilter>): boolean =>
  searchTerm === undefined ||
  [unit.de, unit.en, unit.fa, removeShortVowels(unit.fa), unit.faRm]
    .some(term => term.toLowerCase().includes(searchTerm.toLowerCase().trim()));

const removeShortVowels = (text: string): string =>
  text.replace(/[َُِ]/g, '');

const buildDictionaryEntry = (unit: LearningUnit, trainingProgress: Record<number, TrainingProgress>): DictionaryEntry => ({
  ...unit,
  scoreDe: trainingProgress[unit.id]?.de.score ?? null,
  scoreFa: trainingProgress[unit.id]?.fa.score ?? null,
});
