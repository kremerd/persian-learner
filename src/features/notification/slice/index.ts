import { createSlice } from '@reduxjs/toolkit';

export interface State {
  notifications: string[];
}

const initialState: State = {
  notifications: [
    'Notif 1',
    'Notif 2',
  ],
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add: (state: State, { payload }: { payload: string }): void => {
      state.notifications.push(payload);
    },
  },
});

export const { add } = slice.actions;
export default slice.reducer;
