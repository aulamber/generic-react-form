export default function getFieldErrorsToDisplay(name, fields, displayErrorsFromStart) {
  const { errors } = fields[name]

  if (!errors || !Object.keys(errors).length) return []

  return Object.keys(errors)
    .filter(error => {
      const { displayStatus } = errors[error]

      // case #1: display any error from start
      if (displayErrorsFromStart) { return true }

      // case #2: display compar error as soon as a compared field becomes dirty
      if (displayStatus !== undefined) { return displayStatus }

      // case #3: display simple error as soon as a field becomes dirty
      return !fields[name].pristine
    })

    .map((error) => {
      return { ...errors[error], name: error }
    })
}
