import React from 'react';
import { Redirect } from 'react-router-dom';
import dictionary from '../features/dictionary/routes';
import trainer from '../features/trainer/routes';

export default [
  ...dictionary,
  ...trainer,
  <Redirect key="root"
    from="/"
    to="/trainer">
  </Redirect>
];
