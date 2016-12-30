import _ from 'lodash'


// ================================ FIELD ERRORS ===============================

function updateFieldError(newError, errors = {}, displayStatus) {
  const { type, bool, message } = newError
  const errorAlreadyInArray = !!errors[type]

  if (bool && !errorAlreadyInArray) {
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
  let errors = {}

  fieldChecks.forEach((check) => {
    const { func, fieldToCompare, fieldWithError } = check
    const displayStatus = (fields[name].pristine === undefined
      ? false
      : !fields[name].pristine
    )

    if (fieldToCompare === undefined) {
      const newError = func(value)
      const simpleErrors = fields[name].errors

      errors = updateFieldError(newError, simpleErrors)
      fields = { ...fields, [name]: { ...fields[name], errors } }
    } else {
      const otherValue = fields[fieldToCompare].value
      const newError = func(value, otherValue)
      const comparErrors = fields[fieldWithError].errors

      errors = updateFieldError(newError, comparErrors, displayStatus)

      if (name !== fieldWithError) {
        fields = { ...fields, [fieldWithError]: { ...fields[fieldWithError], errors } }
      } else {
        fields = { ...fields, [name]: { ...fields[name], errors } }
      }
    }
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
  let newError = {}

  checks.forEach(check => {
    newError = check(fields)

    if (newError.bool && !errors.includes(newError.value)) {
      errors = [ ...errors, newError.value ]
    } else if (!newError.bool && errors.includes(newError.value)) {
      errors = _.filter(errors, (error) => error !== newError.value)
    }
  })

  return errors
}
