import { createSelector } from '@reduxjs/toolkit';
import { Word } from '../../lexicon/model/word';
import { selectWords } from '../../lexicon/selectors';
import { normalizeDe, normalizeEn, normalizeFa, normalizeFaRm } from '../../lexicon/util';
import { ProgressAggregate } from '../../trainer/model/trainingProgress';
import { selectProgress } from '../../trainer/selectors';
import { DictionaryEntry, DictionaryScore } from '../model/dictionaryEntry';
import { State } from '../slice';

const selectSlice = (state: any): State => state.dictionary;
export default selectSlice;

export const selectFilter = createSelector([selectSlice], state => state.filter);

export const selectDictionary = createSelector([selectWords, selectProgress],
  (words, progress) => words.map(word => buildDictionaryEntry(word, progress[word.id]))
);

const buildDictionaryEntry = (word: Word, progress: ProgressAggregate): DictionaryEntry => ({
  id: word.id,
  de: normalizeDe(word),
  fa: normalizeFa(word),
  searchIndex: buildSearchIndex(word),
  word,
  score: buildDictionaryScore(progress),
});

const buildSearchIndex = (word: Word): string[] => [
  normalizeDe(word).toLowerCase(),
  normalizeEn(word).toLowerCase(),
  normalizeFa(word),
  removeDiacritics(normalizeFa(word)),
  normalizeFaRm(word).toLowerCase(),
];

const removeDiacritics = (text: string): string =>
  text.replace(/[َُِ]/g, '');

const buildDictionaryScore = (progress: ProgressAggregate): DictionaryScore => ({
  de: progress?.de?.score,
  deConj: progress?.deConj?.score,
  fa: progress?.fa?.score,
  faConj: progress?.faConj?.score,
});

export const selectFilteredDictionary = createSelector([selectFilter, selectDictionary],
  ({ searchTerm }, entries) => {
    if (searchTerm === undefined) {
      return entries;
    } else {
      const optimizedSearchTerm = searchTerm.toLowerCase().trim();
      return entries.filter(entry =>
        entry.searchIndex.some(term => term.includes(optimizedSearchTerm))
      );
    }
  }
);
