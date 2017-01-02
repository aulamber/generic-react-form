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

export function updateFieldErrors(name, value, fields, checks, comparChecks) {
  let newError = {}
  let errors = fields[name].errors

  checks.forEach(check => {
    if (!comparChecks) {
      newError = check(value)

      errors = fields[name].errors
      errors = updateFieldError(newError, errors)
      fields = { ...fields, [name]: { ...fields[name], errors } }
    } else if (name === check.comparedField || check.fieldsToCompare.includes(name)) {
      const { func, fieldsToCompare, comparedField } = check

      fields = { ...fields, [name]: { ...fields[name], value } }
      newError = func(fields, fieldsToCompare, comparedField)

      const { fieldWithError } = newError
      const displayStatus = (fields[name].pristine === undefined
          ? false
          : !fields[name].pristine
        )

      errors = fields[fieldWithError].errors
      errors = updateFieldError(newError, errors, displayStatus)
      fields = { ...fields, [fieldWithError]: { ...fields[fieldWithError], errors } }
    }
  })

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
