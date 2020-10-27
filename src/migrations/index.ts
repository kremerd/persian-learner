import { PersistMigrate } from 'redux-persist';
import lexiconMigration from './lexiconMigration';

const migrate: PersistMigrate = state => {
  // skip migrations on initial load
  if (state === undefined) {
    return Promise.resolve(undefined as any);
  }

  return Promise.resolve(lexiconMigration(state as any) as any);
};

export default migrate;
