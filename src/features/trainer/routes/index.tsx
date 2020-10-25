import React from 'react';
import { Route } from 'react-router-dom';
import { FarsiTrainer } from '../components/FarsiTrainer/FarsiTrainer';
import { TrainerContainer } from '../components/Trainer/TrainerContainer';

export default [
  <Route key="trainer-german"
    path="/trainer/german"
    component={TrainerContainer}>
  </Route>,
  <Route key="trainer-farsi"
    path="/trainer/farsi"
    component={FarsiTrainer}>
  </Route>,
];