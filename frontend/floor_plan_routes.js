import React, { Component } from 'react';
import { Switch, Route, browserHistory } from 'react-router-dom';

import Customers from './floor_plans/customers/customers';
import FloorPlanUiIndex from './floor_plans/floor_plans_ui/floor_plan_ui_index';

const FloorPlansRoutes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Customers} />
      <Route
        history={browserHistory}
        path='/floor_plans/:slug'
        component={FloorPlanUiIndex}
      />
    </Switch>
  </main>
);

export default FloorPlansRoutes;
