import vocabulary from '../data/vocabulary.json';
import { Word } from '../features/lexicon/model/word';
import { ProgressAggregate } from '../features/trainer/model/trainingProgress';
import { UnscoredTrainingUnit } from '../features/trainer/model/trainingUnit';
import { State } from '../reducers';

interface LexiconMigration {
  added: Word[];
  updated: Word[];
  deleted: Word[];
}

const lexiconMigration = (state: State): State => {
  const migration = buildMigration(state.lexicon.words);

  return {
    ...state,
    lexicon: {
      ...state.lexicon,
      words: migrateWords(state.lexicon.words, migration),
    },
    trainer: {
      ...state.trainer,
      currentTrainingUnit: migrateTrainingUnit(state.trainer.currentTrainingUnit, migration),
      progress: migrateProgress(state.trainer.progress, migration),
    },
  };
};

const buildMigration = (persistedWordRecord: Record<number, Word>): LexiconMigration => {
  const persistedWords = Object.values(persistedWordRecord);
  const expectedWords = vocabulary as Word[];
  const expectedWordRecord = Object.fromEntries(
    vocabulary.map(v => [v.id, v])
  );

  return {
    added: expectedWords.filter(u => !(u.id in persistedWordRecord)),
    updated: expectedWords.filter(u => (u.id in persistedWordRecord) && !isEqual(u, persistedWordRecord[u.id])),
    deleted: persistedWords.filter(u => !(u.id in expectedWordRecord)),
  };
};

const isEqual = (a: Word | undefined, b: Word | undefined): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const migrateWords = (persisted: Record<number, Word>, migration: LexiconMigration): Record<number, Word> => {
  const result = { ...persisted };
  migration.added.forEach(u => result[u.id] = u);
  migration.updated.forEach(u => result[u.id] = u);
  migration.deleted.forEach(u => delete result[u.id]);
  return result;
};

const migrateTrainingUnit = (persisted: UnscoredTrainingUnit | null, { deleted }: LexiconMigration): UnscoredTrainingUnit | null => {
  if (deleted.some(el => el.id === persisted?.id)) {
    return null;
  } else {
    return persisted;
  }
};

const migrateProgress = (persisted: Record<number, ProgressAggregate>, migration: LexiconMigration): Record<number, ProgressAggregate> => {
  const result = { ...persisted };
  migration.updated.forEach(w => delete result[w.id]);
  migration.deleted.forEach(w => delete result[w.id]);
  return result;
};

export default lexiconMigration;
