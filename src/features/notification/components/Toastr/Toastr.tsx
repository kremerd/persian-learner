import React from 'react';
import { Notification } from '../../model/notification';
import { Toast } from '../Toast/Toast';
import './Toastr.scss';

export const Toastr = ({ notifications, clear }: {
  notifications: Notification[];
  clear: (idx: number) => void;
}): JSX.Element => (
  <div className="toastr">
    {notifications.map(notification => (
      <Toast
        clear={(): void => clear(notification.id)}
        message={notification.message}
        key={`toast-${notification.id}`}
      ></Toast>
    ))}
  </div>
);
