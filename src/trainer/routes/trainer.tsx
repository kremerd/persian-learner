import React from 'react';
import { Route } from 'react-router-dom';
import { TrainGerman } from '../components/TrainGerman/TrainGerman';
import { TrainPhoneticPersian } from '../components/TrainPhoneticPersian/TrainPhoneticPersian';

export const trainer = [
  <Route path="/train/german">
    <TrainGerman />
  </Route>,
  <Route path="/train/phonetic-persian">
    <TrainPhoneticPersian />
  </Route>,
];