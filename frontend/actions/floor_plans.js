import axios from 'axios';

export const FETCH_LINES = 'FETCH_LINES';
export const CREATE_LINE = 'CREATE_LINE';
export const FETCH_FLOOR_PLAN_CUSTOMERS = 'FETCH_FLOOR_PLAN_CUSTOMERS';
export const FETCH_FLOOR_PLANS = 'FETCH_FLOOR_PLANS';
export const CLEAR_FLOOR_PLANS = 'CLEAR_FLOOR_PLANS';
export const DELETE_LINE = 'DELETE_LINE';

export const UPDATE_ROTATE = 'UPDATE_ROTATE';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const CREATE_ICON = 'CREATE_ICON';
export const FETCH_PLAN_ITEM_DETAIL = 'FETCH_PLAN_ITEM_DETAIL';
export const CLOSE_PLAN_ITEM_DETAIL = 'CLOSE_PLAN_ITEM_DETAIL';
export const UPDATE_POSITION_DETAIL = 'UPDATE_POSITION_DETAIL';
export const UPDATE_ICON = 'UPDATE_ICON';
export const CREATE_FLOOR_PLAN = 'CREATE_FLOOR_PLAN';
export const UPDATE_FLOOR_PLAN = 'UPDATE_FLOOR_PLAN';
export const UPDATE_DEVICE_ID = 'UPDATE_DEVICE_ID';
export const DELETE_ICON = 'DELETE_ICON';
export const DELETE_FLOOR_PLAN = 'DELETE_FLOOR_PLAN';

export const clearFloorPlan = () => ({
  type: CLEAR_FLOOR_PLANS,
  payload: '',
});

export const deleteLine = (id) => {
  const request = axios.delete(`/lines/${id}`);
  return {
    type: DELETE_LINE,
    payload: request,
  };
};

export const createLine = (line) => {
  const request = axios.post('/lines', line);
  return {
    type: CREATE_LINE,
    payload: request,
  };
};

export const fetchFloorPlanCustomers = () => {
  const request = axios.get('/floor_plans.json');
  return {
    type: FETCH_FLOOR_PLAN_CUSTOMERS,
    payload: request,
  };
};

export const fetchLines = (slug) => {
  const request = axios.get(`/lines?${slug}`);
  return {
    type: FETCH_LINES,
    payload: request,
  }
}

export const updateFloorPlan = floor_plan => {
  const request = axios.put(`/floor_plans/${floor_plan.id}`, floor_plan);
  return {
    type: UPDATE_FLOOR_PLAN,
    payload: request
  };
};

export const deleteFloorPlan = id => {
  const request = axios.delete(`/floor_plans/${id}`);
  return {
    type: DELETE_FLOOR_PLAN,
    payload: request
  };
};

export const fetchFloorPlans = id => {
  const request = axios.get(`/handlers/${id}`);
  return {
    type: FETCH_FLOOR_PLANS,
    payload: request
  };
};

export const updateRotate = (rotate, id) => {
  const request = axios.put(`/handlers/${id}`, { rotate });
  return {
    type: UPDATE_ROTATE,
    payload: request
  };
};

export const updatePosition = (top, left, id) => {
  const request = axios.patch(`/handlers/${id}`, { top, left });

  return {
    type: UPDATE_POSITION,
    payload: request
  };
};

export const createIcon = (icon, slug) => {
  const request = axios.post(`/icons`, { icon, slug });
  return {
    type: CREATE_ICON,
    payload: request
  };
};

export const fetchPlanItemDetail = id => {
  const request = axios.get(`/icons/${id}`);
  return {
    type: FETCH_PLAN_ITEM_DETAIL,
    payload: request
  };
};

export const close = () => {
  return {
    type: CLOSE_PLAN_ITEM_DETAIL,
    payload: []
  };
};

export const updatePositionDetail = (top, left, id) => {
  return {
    type: UPDATE_POSITION_DETAIL,
    payload: [top, left, id]
  };
};

export const updateIcon = icon => {
  const request = axios.put(`/icons/${icon.id}`, { icon });

  return {
    type: UPDATE_ICON,
    payload: request
  };
};

export const deleteIcon = id => {
  const request = axios.delete(`/icons/${id}`);
  return {
    type: DELETE_ICON,
    payload: request
  };
};

export const createFloorPlan = floor_plan => {
  const request = axios.post('/floor_plans', { floor_plan });
  return {
    type: CREATE_FLOOR_PLAN,
    payload: request
  };
};

export const updateDeviceId = icon => {
  const request = axios.put(`/icons/${icon.id}`, { icon });
  return {
    type: UPDATE_DEVICE_ID,
    payload: request
  };
};
