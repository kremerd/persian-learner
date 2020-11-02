import { createSelector } from '@reduxjs/toolkit';
import { selectLearningUnits } from '../../lexicon/selectors';
import { selectTrainingProgress } from '../../trainer/selectors';
import { DictionaryEntry } from '../model/dictionaryEntry';

export const selectDictionary = createSelector([selectLearningUnits, selectTrainingProgress],
  (learningUnits, trainingProgress) => learningUnits.map((unit): DictionaryEntry => ({
    ...unit,
    scoreDe: trainingProgress[unit.id]?.de.score ?? null,
    scoreFa: trainingProgress[unit.id]?.fa.score ?? null,
  }))
);
