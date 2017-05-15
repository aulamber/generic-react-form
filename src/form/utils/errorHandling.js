import _ from 'lodash';

import { isObjectEmpty } from './';


// ================================ FIELD ERRORS ===============================

export function hasFieldErrors(fields) {
  let fieldErrors = false;

  Object.keys(fields).forEach((field) => {
    if (!isObjectEmpty(fields[field].errors)) {
      fieldErrors = true;
    }
  });

  return fieldErrors;
}

function updateFieldError(newError, prevErrors) {
  const { type, bool } = newError;
  const errorAlreadyInObj = !!prevErrors[type];
  let errors = prevErrors;

  if (bool) {
    errors = {
      ...errors,
      [type]: _.omit(newError, ['bool', 'fieldWithError', 'type']),
    };
  } else if (!bool && errorAlreadyInObj) {
    errors = _.omit(errors, type);
  }

  return errors;
}

export function updateFieldErrors(fields, fieldChecks, name) {
  const field = fields[name];
  let { errors } = field;
  let error;

  fieldChecks.forEach((check) => {
    error = check(field.value);
    errors = updateFieldError(error, errors);
  });

  return { ...fields, [name]: { ...field, errors } };
}


// ================================ FORM ERRORS ================================

export function updateFormErrors(prevFields, newFields, formChecks, prevErrors, fieldToCheck) {
  const formErrors = {};
  console.log('prevErrors = ', prevErrors);
  const isPreviousError = args => args.filter(arg => prevErrors[arg]).length;

  formChecks.forEach((check) => {
    console.log('isPreviousError = ', isPreviousError(check.args));

    const fields = (
      fieldToCheck === 'all'
      || (check.args.includes(fieldToCheck) && isPreviousError(check.args))
    ) ? newFields : prevFields;
    const values = check.args.map(arg => fields[arg].value);
    const result = check.func(...values);

    if (result) {
      Object.keys(result).forEach((field) => {
        formErrors[field] = (formErrors[field]
          ? [...formErrors[field], result[field]]
          : [result[field]]
        );
      });
    }
  });

  return formErrors;
}
