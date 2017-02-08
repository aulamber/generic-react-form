import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function formReducer(
  state = initialState,
  action
) {
  switch (action.type) {

    case types.SET_FORM_PRISTINE: {
      return { ...state, pristine: false };
    }

    case types.SET_FIELDS: {
      return { ...state, fields: action.fields };
    }

    case types.SET_FIELDS_ERRORS_TO_DISPLAY: {
      return { ...state, fieldErrorsToDisplay: action.fieldErrorsToDisplay };
    }

    case types.SET_FORM_ERRORS: {
      return { ...state, formErrors: action.formErrors };
    }

    case types.SET_DISABLE_STATUS: {
      return { ...state, disabled: action.disabled };
    }

    default:
      return state;
  }
}
