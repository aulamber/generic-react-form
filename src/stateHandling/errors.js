import _ from 'lodash'


// ================================ FIELD ERRORS ===============================

function updateFieldError(newError, errors = {}, displayStatus) {
  const { type, bool, message } = newError
  const errorAlreadyInArray = !!errors[type]

  if (bool) {
    const error = (displayStatus ===  undefined
      ? { message }
      : { message, displayStatus }
    )
    errors = { ...errors, [type]: error }
  }
  if (!bool && errorAlreadyInArray) {
    errors = _.omit(errors, type)
  }

  return errors
}

export function updateFieldErrors(name, value, fields, fieldChecks) {
  let errors = fields[name].errors

  fieldChecks.forEach((check) => {
    const newError = check.func(value)

    errors = updateFieldError(newError, errors)
    fields = { ...fields, [name]: { ...fields[name], errors } }
  });

  return fields
}

export function hasFieldErrors(fields) {
  let fieldErrors = false

  Object.keys(fields).forEach(field => {
    if (Object.keys(fields[field].errors).length) {
      fieldErrors = true
      return
    }
  })

  return fieldErrors
}


// ================================ FORM ERRORS ================================

export function updateFormErrors(errors, checks, fields) {
  checks.forEach(check => {
    const {type, bool, message} = check(fields)

    if (bool) {
      errors = { ...errors, [type]: message }
    } else if (!bool && errors[type]) {
      errors = _.omit(errors, type)
    }
  })


  return errors
}
