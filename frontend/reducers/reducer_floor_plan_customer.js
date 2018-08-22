import {
  FETCH_FLOOR_PLAN_CUSTOMERS,
  CREATE_FLOOR_PLAN,
  DELETE_FLOOR_PLAN,
  UPDATE_FLOOR_PLAN
} from './../actions/floor_plans';

const initialState = {
  result: [],
  floor_plans: [],
  s3_aws: []
};

const FloorPlanCustomersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FLOOR_PLAN_CUSTOMERS:
      return action.payload.data;
    case CREATE_FLOOR_PLAN:
      const locationIDS = state.result.map(el => {
        return el.qty >= 1 ? el.location_id : null;
      });

      const location_id = action.payload.data.floor_plan.location_id;
      const bool = locationIDS.includes(location_id);

      if (bool) {
        return {
          ...state,
          result: state.result.map(el => {
            if (el.location_id === location_id) {
              return {
                name: el.name,
                address: el.address,
                location_id: el.location_id,
                qty: el.qty + 1
              };
            } else {
              return el;
            }
          }),
          floor_plans: state.floor_plans.concat(action.payload.data.floor_plan)
        };
      } else {
        return {
          ...state,
          result: state.result.map(el => {
            if (el.location_id == location_id) {
              return {
                name: el.name,
                address: el.address,
                location_id: el.location_id,
                qty: 1
              };
            } else {
              return el;
            }
          }),
          floor_plans: state.floor_plans.concat(action.payload.data.floor_plan)
        };
      }

    case UPDATE_FLOOR_PLAN:
      return {
        ...state,
        floor_plans: state.floor_plans.map(el => {
          return el.id === action.payload.data.floor_plan.id
            ? action.payload.data.floor_plan
            : el;
        })
      };
    case DELETE_FLOOR_PLAN:
      return {
        ...state,
        result: state.result.map(el => {
          if (el.location_id === action.payload.data.location_id) {
            return {
              name: el.name,
              address: el.address,
              location_id: el.location_id,
              qty: el.qty - 1
            };
          } else {
            return el;
          }
        }),
        floor_plans: state.floor_plans.filter(
          el => el.id !== action.payload.data.id
        )
      };
  }

  return state;
};

export default FloorPlanCustomersReducer;
