import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import dictionaryRoutes from '../features/dictionary/routes';
import trainerRoutes from '../features/trainer/routes';

export default (
  <Switch>
    {dictionaryRoutes},
    {trainerRoutes},
    <Redirect key="root" to="/trainer">
    </Redirect>
  </Switch>
);
