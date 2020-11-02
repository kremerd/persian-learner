import React from 'react';
import { Route } from 'react-router-dom';
import { DictionaryContainer } from '../components/Dictionary/DictionaryContainer';

export default [
  <Route key="dictionary"
    path="/dictionary"
    component={DictionaryContainer}>
  </Route>,
];
