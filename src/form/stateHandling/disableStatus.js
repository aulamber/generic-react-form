function updateWhenDirty(formPristine, displayErrorsFromStart, fields, anyFormError) {
  let disabled = !displayErrorsFromStart && !formPristine && anyFormError

  if (!disabled) {
    Object.keys(fields).forEach(field => {
      const { pristine, errors } = fields[field]
      let fieldErrors = {}

      if (errors) { fieldErrors = Object.keys(errors) }
      if (errors && fieldErrors.length) {
        fieldErrors.forEach(error => {
          if (!formPristine && (
            (!pristine && errors[error].displayStatus === undefined)
            || errors[error].displayStatus
          )) {
            disabled = true
            return
          }
        })
      }
    })
  }

  return disabled
}

function updateFromStart(fields, anyFormError) {
  let disabled = anyFormError

  if (!disabled) {
    Object.keys(fields).forEach(field => {
      const { errors } = fields[field]

      if (errors && Object.keys(errors).length) {
        disabled = true
        return
      }
    })
  }

  return disabled
}

export default function updateDisableStatus(
  pristine,
  displayErrorsFromStart,
  fields,
  formErrors
) {

  const anyFormError = !!Object.keys(formErrors).length

  if (displayErrorsFromStart) {
    return updateFromStart(fields, anyFormError)
  }
  return updateWhenDirty(pristine, displayErrorsFromStart, fields, anyFormError)
}
