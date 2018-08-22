import {
  FETCH_PLAN_ITEM_DETAIL,
  CLOSE_PLAN_ITEM_DETAIL,
  UPDATE_POSITION_DETAIL,
  UPDATE_POSITION,
  UPDATE_DEVICE_ID,
  DELETE_ICON
} from './../actions/floor_plans';

const initialState = {
  icon: {}
}

const PlanItemDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAN_ITEM_DETAIL:
      return action.payload.data;
    case CLOSE_PLAN_ITEM_DETAIL:
      return initialState;
    case UPDATE_POSITION_DETAIL:
      return action.payload[2] === state.icon.id
        ? {
            ...state,
            icon: {
              ...state.icon,
              top: action.payload[0],
              left: action.payload[1],
              drag: true
            }
          }
        : state;
    case UPDATE_POSITION:
      if (state.length === 0) {
        return [];
      } else {
        return {
          ...state,
          icon: {
            ...state.icon,
            top: action.payload.data.top,
            left: action.payload.data.left,
            drag: false
          }
        };
      }
    case UPDATE_DEVICE_ID:
      return {
        ...state,
        icon: action.payload.data.icon,
        device: action.payload.data.device,
      };
    case DELETE_ICON:
      return action.payload.data.id === state.icon.id ? [] : state;
    default:
      return state;
  }
};

export default PlanItemDetailReducer;
