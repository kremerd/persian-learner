import { PersistedState } from 'redux-persist';
import { State } from '../reducers';

export default (state: PersistedState): PersistedState => {
  return migrateState(state) as unknown as PersistedState;
};

const migrateState = (oldState: any): State => {
  return {
    dictionary: oldState.dictionary,
    lexicon: {
      words: oldState.lexicon.units,
    },
    notification: oldState.notification,
    trainer: {
      currentTrainingUnit: null,
      progress: oldState.trainer.trainingProgress,
    },
  };
};
