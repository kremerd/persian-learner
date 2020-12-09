import React from 'react';
import { Route } from 'react-router-dom';
import { Settings } from '../components/Settings/Settings';

export default [
  <Route key="settings"
    path="/settings"
    component={Settings}>
  </Route>,
];
