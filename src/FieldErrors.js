import React, { PropTypes } from 'react';

function FieldErrors({ displayErrorsFromStart, name, fields }) {
  const { errors } = fields[name]

  if (!errors || !Object.keys(errors).length) return <div />

  const errorMap = Object.keys(errors)
    .filter(error => {
      // case #1: display any error from start
      if (displayErrorsFromStart) { return true }

      // case #2: display compar error as soon as a compared field becomes dirty
      if (errors[error].displayStatus !== undefined) { return errors[error].displayStatus }

      // case #3: display simple error as soon as a field becomes dirty
      return !fields[name].pristine
    })
    
    .map((error, i) => {
      return <p key={i}>Field error #{i}: {errors[error].message}</p>
    })

  return <div>{ errorMap }</div>
}

FieldErrors.propTypes = {
  displayErrorsFromStart: PropTypes.bool,
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
}

export default FieldErrors
