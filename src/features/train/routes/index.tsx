import React from 'react';
import { Route } from 'react-router-dom';
import { TrainGermanContainer } from '../components/TrainGerman/TrainGermanContainer';
import { TrainPhoneticPersian } from '../components/TrainPhoneticPersian/TrainPhoneticPersian';

export default [
  <Route key="train-german"
    path="/train/german"
    component={TrainGermanContainer}>
  </Route>,
  <Route key="train-phonetic-persian"
    path="/train/phonetic-persian"
    component={TrainPhoneticPersian}>
  </Route>,
];