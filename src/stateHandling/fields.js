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
        errors: fieldErrors[name].errors,
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


export function updateFieldsPristine(fields) {
  let updatedFields = fields

  Object.keys(updatedFields).forEach(field => {
    updatedFields = {
      ...updatedFields,
      [field]: { ...updatedFields[field], pristine: false },
    }
  })

  return updatedFields
}

export function updateFieldsPostSubmit(fields) {
  let errors = {}

  Object.keys(fields).forEach(field => {
    const fieldErrors = fields[field].errors

    Object.keys(fieldErrors).forEach(error => {
      if (fieldErrors[error].displayStatus !== undefined) {
        errors = { ...fieldErrors, [error]: { ...fieldErrors[error], displayStatus: true } }
      }
    })

    fields = {
      ...fields,
      [field]: { ...fields[field], pristine: false, errors },
    }
  })

  return fields
}
