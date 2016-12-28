import _ from 'lodash'

// ================================ FIELD ERRORS ===============================

function updateSimpleErrors(check, value, simpleErrors) {
  const newError = check.func(value)
  const errorAlreadyInArray = simpleErrors.includes(newError.value)

  if (newError.bool && !errorAlreadyInArray) {
    simpleErrors = [...simpleErrors, newError.value]
  }
  if (!newError.bool && errorAlreadyInArray) {
    simpleErrors = _.filter(simpleErrors, (error) => error !== newError.value);
  }

  return simpleErrors
}

function updateComparErrors(check, value, fields) {
  const { func, fieldToCompare, fieldWithError } = check
  const newError = func(value, fields[fieldToCompare].value)
  let comparErrors = fields[fieldWithError].errors || []
  const errorAlreadyInArray = comparErrors.includes(newError.value)

  if (newError.bool && !errorAlreadyInArray) {
    comparErrors = [...comparErrors, newError.value]
  }
  if (!newError.bool && errorAlreadyInArray) {
    comparErrors = _.filter(comparErrors, (error) => error !== newError.value);
  }

  return comparErrors
}

export function updateFieldErrors(name, value, fields, fieldChecks) {
  let updatedFields = fields
  let errors

  fieldChecks.forEach((check) => {
    const { fieldToCompare, fieldWithError } = check

    if (fieldToCompare === undefined) {
      errors = updateSimpleErrors(check, value, updatedFields[name].errors = [])
      updatedFields = { ...updatedFields, [name]: { ...updatedFields[name], errors } }
    } else {
      errors = updateComparErrors(check, value, updatedFields)

      if (name !== fieldWithError) {
        updatedFields = { ...updatedFields, [fieldWithError]: { ...updatedFields[fieldWithError], errors } }
      } else {
        updatedFields = { ...updatedFields, [name]: { ...updatedFields[name], errors } }
      }
    }
  });

  return updatedFields
}

export function hasFieldErrors(fields) {
  let fieldErrors = false

  Object.keys(fields).forEach(field => {
    if (fields[field].errors.length) {
      fieldErrors = true
      return
    }
  })

  return fieldErrors
}


// ================================ FORM ERRORS ================================s

export function updateFormErrors(formErrors, checks, fields) {
  let errors = formErrors
  let newError

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
