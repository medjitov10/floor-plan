import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';

import FloorPlanCustomersReducer from './reducer_floor_plan_customer';
import FloorPlanReducer from './reducer_floor_plan';
import PlanItemDetailReducer from './reducer_plan_item_detail';
import LineReducer from './reducer_line';

const rootReducer = combineReducers({
  floorPlanCustomers: FloorPlanCustomersReducer,
  floorPlan: FloorPlanReducer,
  planItemDetail: PlanItemDetailReducer,
  lines: LineReducer,
});

export default rootReducer;
