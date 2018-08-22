import {
  FETCH_LINES,
  CREATE_LINE,
  DELETE_LINE
} from '../actions/floor_plans';

const LineReducer = (state = [], action) => {

  switch (action.type) {
    case FETCH_LINES:
      return action.payload.data;
    case CREATE_LINE:
      return state.concat(action.payload.data);
    case DELETE_LINE:
      return state.filter(el => (el.id !== action.payload.data.id));
    default:
      return state;
  }
};
export default LineReducer;
