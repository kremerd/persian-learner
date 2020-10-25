import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../model/notification';

export interface State {
  nextId: number;
  notifications: Notification[];
}

const initialState: State = {
  nextId: 0,
  notifications: [],
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state: State, { payload }: { payload: string }): void => {
      state.notifications.push({ id: state.nextId, message: payload });
      state.nextId++;
    },
    removeNotification: (state: State, { payload }: { payload: number }): void => {
      state.notifications = state.notifications.filter(n => n.id !== payload);
    },
  },
});

export const { addNotification, removeNotification } = slice.actions;
export default slice.reducer;
