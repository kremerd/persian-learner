import React from 'react';
import { Route } from 'react-router-dom';
import { TrainerContainer } from '../components/Trainer/TrainerContainer';

export default [
  <Route key="trainer"
    path="/trainer"
    component={TrainerContainer}>
  </Route>,
];
