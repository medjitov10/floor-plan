import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_ASSIGNMENTS = 'FETCH_ASSIGNMENTS';
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const DELETE_NEW_PRODUCT = 'DELETE_NEW_PRODUCT';
export const NEW_PRODUCTS_SUBMIT = 'NEW_PRODUCTS_SUBMIT';
export const CURRENT_ASSIGNMENT = 'CURRENT_ASSIGNMENT';
export const DELETE_CURRENT_ASSIGNMENT = 'DELETE_CURRENT_ASSIGNMENT';
export const INCREASE_QTY_ASSIGNMENT = 'INCREASE_QTY_ASSIGNMENT';
export const ADD_NEW_ASSIGNMENT = 'ADD_NEW_ASSIGNMENT';
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT';
export const CREATE_ASSIGNMENTS = 'CREAATE_ASSIGNMENTS';
export const UPDATE_QTY_ASSIGNMENT = 'UPDATE_QTY_ASSIGNMENT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FETCH_INSPECTION_REQUEST = 'FETCH_INSPECTION_REQUEST';
export const CHANGE_IR_STATUS = 'CHANGE_IR_STATUS';
export const DELETE_INVENTORY_REQUEST = 'DELETE_INVENTORY_REQUEST';

export const updateQtyAssignment = (sku, qty) => {
  return {
    type: UPDATE_QTY_ASSIGNMENT,
    payload: [sku, qty]
  };
};

export const updateProduct = product => {
  const request = axios.put('/productsupdate', { product: product });
  return {
    type: UPDATE_PRODUCT,
    payload: request
  };
};

export const fetchProducts = () => {
  const request = axios.get('/products.json');

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
};

export const fetchAssignments = () => {
  const request = axios.get('/assignments');

  return {
    type: FETCH_ASSIGNMENTS,
    payload: request
  };
};

export const addNewAssignment = obj => {
  return {
    type: ADD_NEW_ASSIGNMENT,
    payload: obj
  };
};

export const increaseQtyAssignment = sku => {
  return {
    type: INCREASE_QTY_ASSIGNMENT,
    payload: sku
  };
};

export const deleteAssignment = sku => {
  return {
    type: DELETE_ASSIGNMENT,
    payload: sku
  };
};

export const currentAssignment = (id, type) => {
  const request = axios.get(`/project_devices/${type.toLowerCase()}/${id}`);

  return {
    type: CURRENT_ASSIGNMENT,
    payload: request
  };
};

export const deleteCurrentAssignment = () => {
  return {
    type: DELETE_CURRENT_ASSIGNMENT
  };
};

export const addNewProduct = product => {
  return {
    type: ADD_NEW_PRODUCT,
    payload: product
  };
};

export const deleteNewProduct = id => {
  return {
    type: DELETE_NEW_PRODUCT,
    payload: id
  };
};

export const newProductsSubmit = (delivery, newProducts) => {
  const request = axios.post('/products-and-delivery', {
    delivery: delivery,
    products: newProducts
  });
  return {
    type: NEW_PRODUCTS_SUBMIT,
    payload: request
  };
};

export const createAssignments = (state, assignments) => {
  const obj = {
    assignments: assignments,
    assignee_id: state.asignee.id,
    assignee_type: state.type,
    tech_name: state.technician.full_name
  };

  const request = axios.post('/assignments', obj);

  return {
    type: CREATE_ASSIGNMENTS,
    payload: request
  };
};
export const fetchInventoryRequest = () => {
  const request = axios.get('/get_inventory_request');

  return {
    type: FETCH_INSPECTION_REQUEST,
    payload: request
  }
}

export const changeInventoryRequestStatus = (id, status) => {
  const request = axios.put('/get_inventory_request', {id: id, status: status});

  return {
    type: CHANGE_IR_STATUS,
    payload: request
  }
}

export const deleteInventoryRequest = (id) => {
  const request = axios.delete(`/delete_inventory_request/${id}`);

  return {
    type: DELETE_INVENTORY_REQUEST,
    payload: request
  }
}
