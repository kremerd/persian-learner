import React from 'react';
import { Route } from 'react-router-dom';
import { TrainGerman } from '../components/TrainGerman/TrainGerman';
import { TrainPhoneticPersian } from '../components/TrainPhoneticPersian/TrainPhoneticPersian';


export const trainer = [
  <Route key="train-german"
    path="/train/german"
    component={TrainGerman}>
  </Route>,
  <Route key="train-phonetic-persian"
    path="/train/phonetic-persian"
    component={TrainPhoneticPersian}>
  </Route>,
];