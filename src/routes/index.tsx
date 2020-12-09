import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import dictionaryRoutes from '../features/dictionary/routes';
import settingsRoutes from '../features/settings/routes';
import trainerRoutes from '../features/trainer/routes';

export default (
  <Switch>
    {dictionaryRoutes},
    {settingsRoutes},
    {trainerRoutes},
    <Redirect key="root" to="/trainer">
    </Redirect>
  </Switch>
);
