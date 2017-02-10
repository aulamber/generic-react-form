import { updateFieldErrors } from './errorHandling'

export function initializeFields(fields, checks) {
  let stateFields = {}

  Object.keys(fields).forEach(name => {
    const { value } = fields[name]
    fields = updateFieldErrors(name, value, fields, checks[name])
    fields = updateFieldErrors(name, value, fields, checks.comparChecks, true)

    stateFields = {
      ...stateFields,
      [name]: {
        pristine: true,
        isRequired: fields[name].isRequired,
        value: value || '',
        errors: fields[name].errors || {},
      },
    }
  })

  return stateFields
}

export function updateFieldValue(name, value, fields) {
  if (!fields[name]) { return fields }

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
