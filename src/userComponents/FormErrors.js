import React, { PropTypes } from 'react';

function FormErrors({ pristine, displayErrorsFromStart, formErrors }) {
  let errors = {}
  const styles = {
    container: {
      margin: 'auto',
      width: '320px',
      color: 'white',
      backgroundColor: '#ffaa80',
      borderRadius: '10px',
      padding: '1px',
      marginBottom: '35px',
    },
    title: {
      fontWeight: 'bold',
    },
  }

  if (formErrors) { errors = Object.keys(formErrors) }

  const hasNoError = (displayErrorsFromStart
    ? !formErrors || !errors.length
    : pristine || !formErrors || !errors.length
  )
  if (hasNoError) return <div />

  const errorMap = errors.map((error, i) => {
    return <p key={i}>{formErrors[error]}</p>
  })

  return (
    <div style={styles.container}>
      <p style={styles.title}>Form errors:</p>
      { errorMap }
    </div>
  )
}

FormErrors.propTypes = {
  pristine: PropTypes.bool,
  displayErrorsFromStart: PropTypes.bool,
  formErrors: PropTypes.shape(),
}

export default FormErrors
