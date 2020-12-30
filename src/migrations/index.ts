import { createMigrate, PersistedState } from 'redux-persist';
import migrationToV2 from './2-addVerbDetails';
import lexiconMigration from './lexiconMigration';

const migrate = (state: PersistedState, version: number): Promise<PersistedState> => {
  // skip migrations on initial load
  if (state === undefined) {
    return Promise.resolve(undefined as any);
  }

  return createMigrate({
    2: migrationToV2
  })(state, version)
    .then(lexiconMigration);
};

export default migrate;
