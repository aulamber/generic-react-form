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
