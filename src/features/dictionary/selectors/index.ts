import { createSelector } from '@reduxjs/toolkit';
import { conjugateDe } from '../../grammar/de/conjugation';
import { Word } from '../../lexicon/model/word';
import { selectWords } from '../../lexicon/selectors';
import { normalizeDe, normalizeEn, normalizeFa, normalizeFaRm } from '../../lexicon/util';
import { ProgressAggregate } from '../../trainer/model/trainingProgress';
import { selectTrainingProgress } from '../../trainer/selectors';
import { DictionaryEntry } from '../model/dictionaryEntry';
import { DictionaryFilter } from '../model/dictionaryFilter';
import { State } from '../slice';

const selectSlice = (state: any): State => state.dictionary;
export default selectSlice;

export const selectFilter = createSelector([selectSlice], state => state.filter);

export const selectDictionary = createSelector([selectFilter, selectWords, selectTrainingProgress],
  (filter, words, trainingProgress) => words
    .filter(word => wordMatchesFilter(word, filter))
    .map(word => buildDictionaryEntry(word, trainingProgress))
);

const wordMatchesFilter = (word: Word, { searchTerm }: Partial<DictionaryFilter>): boolean =>
  searchTerm === undefined ||
  [word.type === 'verb' ? conjugateDe(word.de, 'infinitive') : word.de, word.en, word.fa, removeDiacritics(word.fa), word.faRm]
    .some(term => term.toLowerCase().includes(searchTerm.toLowerCase().trim()));

const removeDiacritics = (text: string): string =>
  text.replace(/[َُِ]/g, '');

const buildDictionaryEntry = (word: Word, trainingProgress: Record<number, ProgressAggregate>): DictionaryEntry => ({
  type: word.type,
  id: word.id,
  de: normalizeDe(word),
  en: normalizeEn(word),
  fa: normalizeFa(word),
  faRm: normalizeFaRm(word),
  scoreDe: trainingProgress[word.id]?.de.score ?? null,
  scoreFa: trainingProgress[word.id]?.fa.score ?? null,
});
