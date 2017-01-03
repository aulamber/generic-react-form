import * as types from '../actions/actionTypes';

export function setFormPristine() {
  return { type: types.SET_FORM_PRISTINE };
}

export function setFields(fields) {
  return { type: types.SET_FIELDS, fields };
}

export function setFormErrors(formErrors) {
  return { type: types.SET_FORM_ERRORS, formErrors };
}

export function setDisableStatus(disabled) {
  return { type: types.SET_DISABLE_STATUS, disabled };
}
