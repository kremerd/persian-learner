import React from 'react';
import { Route } from 'react-router-dom';
import { TrainGermanContainer } from '../components/TrainGerman/TrainGermanContainer';
import { TrainPhoneticPersian } from '../components/TrainPhoneticPersian/TrainPhoneticPersian';

export default [
  <Route key="train-german"
    path="/trainer/german"
    component={TrainGermanContainer}>
  </Route>,
  <Route key="train-phonetic-persian"
    path="/trainer/persian"
    component={TrainPhoneticPersian}>
  </Route>,
];