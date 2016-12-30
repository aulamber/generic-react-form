import React, { PropTypes } from 'react';

function FieldErrors({ displayErrorsFromStart, name, fields }) {
  const { pristine, errors } = fields[name]
  const hasNoError = (displayErrorsFromStart
    ? !errors || !errors.length
    : pristine || !errors || !errors.length
  )

  if (hasNoError) return <div />

  const errorMap = errors.map((error, i) => <p key={i}>Field error #{i}: {error}</p>)

  return <div>{ errorMap }</div>
}

FieldErrors.propTypes = {
  displayErrorsFromStart: PropTypes.bool,
  name: PropTypes.string.isRequired,
  fields: PropTypes.shape(),
}

export default FieldErrors
