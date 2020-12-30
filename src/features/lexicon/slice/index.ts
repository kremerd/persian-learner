import { createSlice } from '@reduxjs/toolkit';
import vocabulary from '../../../data/vocabulary.json';
import { Word } from '../model/word';

export interface State {
  words: Record<number, Word>;
}

const initialState: State = {
  words: Object.fromEntries(
    (vocabulary as Word[]).map(w => [w.id, w])
  )
};

const slice = createSlice({
  name: 'lexicon',
  initialState,
  reducers: {
  }
});

export default slice.reducer;
