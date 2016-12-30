import React, { PropTypes } from 'react';

function FormErrors({ pristine, displayErrorsFromStart, formErrors }) {
  const hasNoError = (displayErrorsFromStart
    ? !formErrors || !formErrors.length
    : pristine || !formErrors || !formErrors.length
  )
  if (hasNoError) return <div />

  const errorMap = formErrors.map((error, i) => <p key={i}>Form error #{i}: {error}</p>)

  return <div>{ errorMap }</div>
}

FormErrors.propTypes = {
  pristine: PropTypes.bool,
  displayErrorsFromStart: PropTypes.bool,
  formErrors: PropTypes.arrayOf(PropTypes.string.isRequired),
}

export default FormErrors
