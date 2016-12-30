export default function updateDisableStatus(displayErrorsFromStart, fields, formErrors) {
  if (!displayErrorsFromStart) { return false }

  let disabled = !!formErrors.length

  if (!disabled) {
    Object.keys(fields).forEach(field => {
      const {isRequired, value, errors} = fields[field]

      if ((isRequired && !value) || (errors && Object.keys(errors).length)) {
        disabled = true
        return
      }
    })
  }

  return disabled
}
