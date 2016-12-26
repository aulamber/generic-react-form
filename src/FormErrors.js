import React, { PropTypes } from 'react';

function FormError({ pristine, formErrors }) {

  if (!formErrors || !formErrors.length) return <div />

  const errorMap = formErrors.map((error, i) => <p key={i}>Form error #{i}: {error}</p>)

  return <div>{ errorMap }</div>
}

FormError.propTypes = {
  pristine: PropTypes.bool,
  formErrors: PropTypes.string,
}

export default FormError
