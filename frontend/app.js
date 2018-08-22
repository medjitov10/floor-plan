import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter } from 'react-router-dom';

import FloorPlansRoutes from './floor_plan_routes';
import reducers from './reducers/reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
/* global document */

document.addEventListener('DOMContentLoaded', () => {
  const floorPlanID = document.getElementById('floor-plan-react');
  floorPlanID && ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <FloorPlansRoutes />
      </BrowserRouter>
    </Provider>, floorPlanID);
});
