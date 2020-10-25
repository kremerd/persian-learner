import React from 'react';
import { Redirect } from 'react-router-dom';
import trainer from '../features/trainer/routes';

export default [
  ...trainer,
  <Redirect key="root"
    from="/"
    to="/trainer">
  </Redirect>
];
