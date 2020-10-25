import { createSelector } from '@reduxjs/toolkit';
import { State } from '../slice';

const selectSlice = (state: any): State => state.notification;
export default selectSlice;

export const selectNotifications = createSelector([selectSlice], ({ notifications }) => notifications);
