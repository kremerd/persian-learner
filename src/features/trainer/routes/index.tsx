import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { TrainerContainer } from '../components/Trainer/TrainerContainer';
import { TrainingMode } from '../model/trainingMode';

export default [
  <Route key="trainerLearn"
    path="/trainer/learn"
    component={TrainerContainer(TrainingMode.Learning)}>
  </Route>,
  <Route key="trainerExam"
    path="/trainer/exam"
    component={TrainerContainer(TrainingMode.Examination)}>
  </Route>,
  <Redirect key="trainerRoot"
    from="/trainer"
    to="/trainer/learn">
  </Redirect>,
];
