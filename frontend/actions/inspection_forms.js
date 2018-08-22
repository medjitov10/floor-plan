import axios from 'axios';

export const CREATE_INSPECTION_FORM = 'CREATE_INSPECTION_FORM';
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_INSPECTION_FORMS = 'FETCH_INSPECTION_FORMS';
export const FETCH_INSPECTION_FORM_ITEM = 'FETCH_INSPECTION_FORM_ITEM';

export const createInspectionForm = arr => {
  const request = axios.post('/inspection_forms', { inspection_form: arr });
  return {
    type: CREATE_INSPECTION_FORM,
    payload: request
  };
};

export const fetchLocations = () => {
  const request = axios.get('/locations');
  return {
    type: FETCH_LOCATIONS,
    payload: request
  };
};

export const fetchInspectionForms = () => {
  const request = axios.get('/inspection_forms.json');
  return {
    type: FETCH_INSPECTION_FORMS,
    payload: request
  };
};

export const fetchInspectionFormItem = id => {
  const request = axios.get(`/fetch_inspection_form_item/${id}.json`);
  return {
    type: FETCH_INSPECTION_FORM_ITEM,
    payload: request
  };
};
