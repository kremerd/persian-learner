import vocabulary from '../data/vocabulary.json';
import { LearningUnit } from '../features/lexicon/model/learningUnit';
import { TrainingProgress } from '../features/trainer/model/trainingProgress';
import { TrainingUnit } from '../features/trainer/model/trainingUnit';
import { State } from '../reducers';

interface LexiconMigration {
  added: LearningUnit[];
  updated: LearningUnit[];
  deleted: LearningUnit[];
}

const lexiconMigration = (state: State): State => {
  const migration = buildMigration(state.lexicon.units);

  return {
    ...state,
    lexicon: {
      ...state.lexicon,
      units: migrateUnitsTrainingProgress(state.lexicon.units, migration),
    },
    trainer: {
      ...state.trainer,
      trainingUnit: migrateTrainingUnit(state.trainer.trainingUnit, migration),
      trainingProgress: migrateTrainingProgress(state.trainer.trainingProgress, migration),
    },
  };
};

const buildMigration = (persistedUnitRecord: Record<number, LearningUnit>): LexiconMigration => {
  const persistedUnits = Object.values(persistedUnitRecord);
  const expectedUnits = vocabulary as LearningUnit[];
  const expectedUnitRecord = Object.fromEntries(
    vocabulary.map(v => [v.id, v])
  );

  return {
    added: expectedUnits.filter(u => !(u.id in persistedUnitRecord)),
    updated: expectedUnits.filter(u => (u.id in persistedUnitRecord) && !isEqual(u, persistedUnitRecord[u.id])),
    deleted: persistedUnits.filter(u => !(u.id in expectedUnitRecord)),
  };
};

const isEqual = (a: LearningUnit | undefined, b: LearningUnit | undefined): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const migrateUnitsTrainingProgress = (persisted: Record<number, LearningUnit>, migration: LexiconMigration): Record<number, LearningUnit> => {
  const result = { ...persisted };
  migration.added.forEach(u => result[u.id] = u);
  migration.updated.forEach(u => result[u.id] = u);
  migration.deleted.forEach(u => delete result[u.id]);
  return result;
};

const migrateTrainingUnit = (persisted: TrainingUnit | null, { deleted }: LexiconMigration): TrainingUnit | null => {
  if (deleted.some(el => el.id === persisted?.id)) {
    return null;
  } else {
    return persisted;
  }
};

const migrateTrainingProgress = (persisted: Record<number, TrainingProgress>, migration: LexiconMigration): Record<number, TrainingProgress> => {
  const result = { ...persisted };
  migration.updated.forEach(u => delete result[u.id]);
  migration.deleted.forEach(u => delete result[u.id]);
  return result;
};

export default lexiconMigration;
