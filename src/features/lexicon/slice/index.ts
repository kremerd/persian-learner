import { createSlice } from '@reduxjs/toolkit';
import { LearningUnit } from '../model/learningUnit';
import vocabulary from './vocabulary.json';

export interface State {
  units: LearningUnit[];
}

const initialState: State = {
  units: vocabulary as LearningUnit[]
};

const slice = createSlice({
  name: 'lexicon',
  initialState,
  reducers: {
  }
});

export default slice.reducer;