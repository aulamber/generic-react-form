import React, { PropTypes } from 'react';

function FormErrors({ pristine, displayErrorsFromStart, formErrors }) {
  let errors = {}
  if (formErrors) { errors = Object.keys(formErrors) }

  const hasNoError = (displayErrorsFromStart
    ? !formErrors || !errors.length
    : pristine || !formErrors || !errors.length
  )
  if (hasNoError) return <div />

  const errorMap = errors.map((error, i) => {
    return <p key={i}>Form error #{i}: {formErrors[error]}</p>
  })

  return <div>{ errorMap }</div>
}

FormErrors.propTypes = {
  pristine: PropTypes.bool,
  displayErrorsFromStart: PropTypes.bool,
  formErrors: PropTypes.shape(),
}

export default FormErrors
