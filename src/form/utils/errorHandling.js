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

function setFieldError(newError, prevErrors, displayStatus) {
  const { type, bool, message } = newError;
  const errorAlreadyInArray = !!prevErrors[type];
  let errors = prevErrors;

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

export function setFieldErrors(field, fieldChecks) {
  let errors = field.errors;

  fieldChecks.forEach((check) => {
    errors = setFieldError(check(field.value), errors);
  });

  return errors;
}


// ================================ FORM ERRORS ================================

export function setFormErrors(fields, formChecks, formErrors = {}) {
  let errors = formErrors;

  formChecks.forEach((check) => {
    const { type, bool, message } = check(fields);

    if (bool) {
      errors = { ...errors, [type]: message };
    } else if (!bool && errors[type]) {
      errors = _.omit(errors, type);
    }
  });

  return errors;
}
