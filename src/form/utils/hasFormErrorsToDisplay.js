export default function hasFormErrorsToDisplay(
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
