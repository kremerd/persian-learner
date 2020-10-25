import React from 'react';
import { Toast } from '../Toast/Toast';
import './Toastr.scss';

export const Toastr = ({ notifications }: { notifications: string[] }): JSX.Element => (
  <div className="toastr">
    {notifications.map((notification, i) => (
      <Toast notification={notification} key={`toast-${i}`}></Toast>
    ))}
  </div>
);
