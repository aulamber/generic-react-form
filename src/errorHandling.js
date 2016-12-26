import _ from 'lodash'

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

export function updateFormErrors(checks, fields) {
  let errors = []

  // checks.forEach(check => {
  //   error = check(fields)
  //   if (error) return
  // })

  return errors
}
