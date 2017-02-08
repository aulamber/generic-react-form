export default function getFieldErrorsToDisplay(fields, displayErrorsFromStart) {
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
