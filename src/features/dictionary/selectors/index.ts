import { createSelector } from '@reduxjs/toolkit';
import { Word } from '../../lexicon/model/word';
import { selectWords } from '../../lexicon/selectors';
import { normalizeDe, normalizeEn, normalizeFa, normalizeFaRm } from '../../lexicon/util';
import { ProgressAggregate } from '../../trainer/model/trainingProgress';
import { selectProgress } from '../../trainer/selectors';
import { DictionaryEntry } from '../model/dictionaryEntry';
import { DictionaryFilter } from '../model/dictionaryFilter';
import { State } from '../slice';

const selectSlice = (state: any): State => state.dictionary;
export default selectSlice;

export const selectFilter = createSelector([selectSlice], state => state.filter);

export const selectDictionary = createSelector([selectFilter, selectWords, selectProgress],
  (filter, words, progress) => words
    .filter(word => wordMatchesFilter(word, filter))
    .map(word => buildDictionaryEntry(word, progress))
);

const wordMatchesFilter = (word: Word, { searchTerm }: Partial<DictionaryFilter>): boolean =>
  searchTerm === undefined ||
  [
    normalizeDe(word),
    normalizeEn(word),
    normalizeFa(word),
    removeDiacritics(normalizeFa(word)),
    normalizeFaRm(word)
  ]
    .some(term => term.toLowerCase().includes(searchTerm.toLowerCase().trim()));

const removeDiacritics = (text: string): string =>
  text.replace(/[َُِ]/g, '');

const buildDictionaryEntry = (word: Word, progress: Record<number, ProgressAggregate>): DictionaryEntry => ({
  type: word.type,
  id: word.id,
  de: normalizeDe(word),
  en: normalizeEn(word),
  fa: normalizeFa(word),
  faRm: normalizeFaRm(word),
  scoreDe: progress[word.id]?.de?.score ?? null,
  scoreFa: progress[word.id]?.fa?.score ?? null,
});
