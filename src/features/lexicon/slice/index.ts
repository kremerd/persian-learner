import { createSlice } from '@reduxjs/toolkit';
import vocabulary from '../../../data/vocabulary.json';
import { LearningUnit } from '../model/learningUnit';

export interface State {
  units: Record<number, LearningUnit>;
}

const initialState: State = {
  units: Object.fromEntries(
    (vocabulary as LearningUnit[]).map(v => [v.id, v])
  )
};

const slice = createSlice({
  name: 'lexicon',
  initialState,
  reducers: {
  }
});

export default slice.reducer;
