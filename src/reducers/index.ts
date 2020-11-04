import { combineReducers } from '@reduxjs/toolkit';
import dictionary, { State as DictionaryState } from '../features/dictionary/slice';
import lexicon, { State as LexiconState } from '../features/lexicon/slice';
import notification, { State as NotificationState } from '../features/notification/slice';
import trainer, { State as TrainerState } from '../features/trainer/slice';

export interface State {
  dictionary: DictionaryState;
  lexicon: LexiconState;
  notification: NotificationState;
  trainer: TrainerState;
}

const rootReducer = combineReducers({
  dictionary,
  lexicon,
  notification,
  trainer,
});

export default rootReducer;
