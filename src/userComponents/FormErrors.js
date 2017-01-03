import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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

function mapStateToProps({ formReducer }) {
  const { pristine, formErrors } = formReducer

  return { pristine, formErrors };
}

export default connect(mapStateToProps)(FormErrors);
