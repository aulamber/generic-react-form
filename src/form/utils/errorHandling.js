import _ from 'lodash';

// ================================ FIELD ERRORS ===============================

export function hasFieldErrors(fields) {
  let fieldErrors = false;

  Object.keys(fields).forEach((field) => {
    if (Object.keys(fields[field].errors).length) {
      fieldErrors = true;
    }
  });

  return fieldErrors;
}


function setFieldError(newError, errors = {}, displayStatus) {
  const { type, bool, message } = newError;
  const errorAlreadyInArray = !!errors[type];

  if (bool) {
    const error = (displayStatus === undefined
      ? { message }
      : { message, displayStatus }
    );
    errors = { ...errors, [type]: error };
  }
  if (!bool && errorAlreadyInArray) {
    errors = _.omit(errors, type);
  }

  return errors;
}

export function setFieldErrors(name, value, fields) {
  let errors;
  let error;

  // let errors = fields[name].errors

  fields[name].checks.forEach((check) => {
    error = check(value);

    if (error.bool) {
      errors = { ...errors, error };
    }


    // errors = fields[name].errors
    // errors = setFieldError(newError, errors)
    // field = setFieldError(newError, errors)
    // fields = { ...fields, [name]: { ...fields[name], errors } }
  });

  return { ...fields, [name]: { ...fields[name], errors } };
}


// ================================ FORM ERRORS ================================

export function setFormErrors(/* errors, */checks, fields) {
  let errors = {};

  checks.forEach((check) => {
    const { type, bool, message } = check(fields);

    if (bool) {
      errors = { ...errors, [type]: message };
    }
    /* else if (!bool && errors[type]) {
      errors = _.omit(errors, type)
    }*/
  });

  return errors;
}
