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

export function updateFieldErrors(name, value, fields, checks = [], comparChecks) {
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

export function getFieldErrorsToDisplay(fields, displayErrorsFromStart) {
  let allFieldsErrors = {}
  let filteredFields = Object.keys(fields)

  if (!displayErrorsFromStart) {
    filteredFields = filteredFields.filter(field => {
      const { errors, pristine } = fields[field]

      // case #1: do not add field in filteredFields if no field errors
      if (!Object.keys(errors).length) { return false }

      // case #2: display compar error as soon as a compared field becomes dirty
      if (errors.displayStatus !== undefined) { return errors.displayStatus }

      // case #3: display simple error as soon as a field becomes dirty
      return !pristine
    })
  }

  filteredFields.forEach(field => {
    allFieldsErrors = { ...allFieldsErrors, [field]: fields[field].errors }
  })

  return allFieldsErrors
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

export function shouldDisplayFormErrors(
  formErrors,
  displayErrorsFromStart,
  pristine,
) {
  const errors = (formErrors ? Object.keys(formErrors) : [])

  return !(displayErrorsFromStart
    ? !errors.length
    : pristine || !errors.length
  )
}
