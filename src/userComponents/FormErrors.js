import React, { PropTypes } from 'react';

import styles from './style'

function FormErrors({ formErrors, displayFormErrors }) {
  if (!displayFormErrors) return <div />

  const errorMap = Object.keys(formErrors).map((error, i) => {
    return <p key={i}>{formErrors[error]}</p>
  })

  return (
    <div style={styles.formErrors.container}>
      <p style={styles.formErrors.title}>Form errors:</p>
      { errorMap }
    </div>
  )
}

FormErrors.propTypes = {
  formErrors: PropTypes.shape(),
  displayFormErrors: PropTypes.bool,
};

export default FormErrors;
