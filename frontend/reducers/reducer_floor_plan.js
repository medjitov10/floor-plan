import {
  FETCH_FLOOR_PLANS,
  CREATE_ICON,
  UPDATE_ICON,
  UPDATE_POSITION,
  UPDATE_DEVICE_ID,
  DELETE_ICON,
  CLEAR_FLOOR_PLANS
} from './../actions/floor_plans';

const FloorPlanReducer = (
  state = { floor_plan: [], devices: [], icons: [], location: {} },
  action
) => {
  switch (action.type) {
    case FETCH_FLOOR_PLANS:
      return action.payload.data
    case CREATE_ICON:
      return { ...state, icons: state.icons.concat(action.payload.data) };
    case UPDATE_ICON:
      return {
        ...state,
        icons: state.icons.map(el => {
          return el.id === action.payload.data.icon.id
            ? action.payload.data.icon
            : el;
        })
      };
    case UPDATE_POSITION:
      return {
        ...state,
        icons: state.icons.map((icon) =>
          (icon.id === action.payload.data.id ? action.payload.data : icon))
      }
    case UPDATE_DEVICE_ID:
      return {
        ...state,
        icons: state.icons.map(el => {
          return el.id === action.payload.data.icon.id
            ? action.payload.data.icon
            : el;
        })
      };
    case DELETE_ICON:
      return {
        ...state,
        icons: state.icons.filter(el => el.id !== action.payload.data.id)
      };
    case CLEAR_FLOOR_PLANS:
      return [];
  }
  return state;
};

export default FloorPlanReducer;
