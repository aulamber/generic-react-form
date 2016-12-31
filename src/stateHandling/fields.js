import { updateFieldErrors } from './errors'

export function initializeFields(fields, checks) {
  let stateFields = {}

  Object.keys(fields).forEach(name => {
    const fieldErrors = updateFieldErrors(name, fields[name].value, fields, checks[name])

    stateFields = {
      ...stateFields,
      [name]: {
        pristine: true,
        isRequired: fields[name].isRequired,
        value: fields[name].value || '',
        errors: fieldErrors[name].errors || {},
      },
    }
  })

  return stateFields
}

export function updateFieldValue(name, value, fields) {
  return {
    ...fields,
    [name]: { ...fields[name], pristine: false, value },
  }
}

export function getFinalValues(fields) {
  let values = {}

  Object.keys(fields).forEach(field => {
    values = { ...values, [field]: fields[field].value }
  })

  return values
}

export function updateFieldsPostSubmit(fields) {
  Object.keys(fields).forEach(field => {
    let errors = fields[field].errors

    Object.keys(errors).forEach(error => {
      if (errors[error].displayStatus !== undefined) {
        errors = { ...errors, [error]: { ...errors[error], displayStatus: true } }
      }
    })

    fields = {
      ...fields,
      [field]: { ...fields[field], pristine: false, errors },
    }
  })

  return fields
}
