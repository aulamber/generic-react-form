import React, { PropTypes } from 'react';

function FormErrors({ pristine, formErrors }) {
  if (pristine || !formErrors || !formErrors.length) return <div />

  const errorMap = formErrors.map((error, i) => <p key={i}>Form error #{i}: {error}</p>)

  return <div>{ errorMap }</div>
}

FormErrors.propTypes = {
  pristine: PropTypes.bool,
  formErrors: PropTypes.arrayOf(PropTypes.string.isRequired),
}

export default FormErrors
