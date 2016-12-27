import { updateFieldErrors } from './errors'

export default function initializeFields(fields, checks) {
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
