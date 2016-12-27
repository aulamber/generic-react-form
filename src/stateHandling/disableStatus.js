export default function updateDisableStatus(fields, formErrors) {
  let disabled = !!formErrors.length

  if (!disabled) {
    Object.keys(fields).forEach(field => {
      const {isRequired, value, errors} = fields[field]

      if ((isRequired && !value) || errors.length) {
        disabled = true
        return
      }
    })
  }

  return disabled
}
