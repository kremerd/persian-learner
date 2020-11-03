import { createSlice } from '@reduxjs/toolkit';
import { DictionaryFilter } from '../model/dictionaryFilter';

export interface State {
  filter: Partial<DictionaryFilter>;
}

const initialState: State = {
  filter: {},
};

const slice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    searchDictionary: (state: State, { payload }: { payload: string | null }): void => {
      state.filter.searchTerm = payload || undefined;
    },
  },
});

export const { searchDictionary } = slice.actions;
export default slice.reducer;
